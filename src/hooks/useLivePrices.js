import { useEffect, useRef, useState } from "react";
import { pricesSocket } from "../socket";
import { formatNumWorklet } from "../utils";
import { useNavigation } from "@react-navigation/native";

export const updatePriceOfCoins = (newPrices = {}, coins = []) => {
  const updatedCoins = [...coins];
  let wasUpdated = false;

  for (let i = 0; i < updatedCoins.length - 1; i++) {
    let coin = updatedCoins[i];
    if (newPrices[coin.id] !== undefined) {
      updatedCoins[i] = { ...coin, priceUsd: `$${formatNumWorklet(newPrices[coin.id])}` };
      wasUpdated = true;
    }
  }
  return { wasUpdated, coins: updatedCoins };
};

const areSame = (prevCoins = [], currCoins = []) => {
  if (prevCoins.length !== currCoins.length) {
    return false;
  }
  const prevCommaSepIDs = pricesSocket.coinsToCommaSepIDs(prevCoins);
  const currCommaSepIDs = pricesSocket.coinsToCommaSepIDs(currCoins);
  return prevCommaSepIDs === currCommaSepIDs;
};

export const useLivePrices = (coinsToWatch = []) => {
  const [socket, setSocket] = useState(null);
  const prevCoinsToWatch = useRef([]);
  const navigation = useNavigation();

  const disconnectSocket = () => {
    if (socket !== null) {
      console.log("disconnect socket");
      socket.disconnect();
    }
  };

  const pausePrices = () => {
    if (socket !== null) {
      console.log("pause prices");
      socket.emit("pause prices");
    }
  };

  const resumePrices = () => {
    if (socket !== null) {
      console.log("resume prices");
      socket.emit("resume prices");
    }
  };

  useEffect(() => {
    //called each time coinsToWatch updates (even if only price updated)
    const shouldInitSocket = !areSame(prevCoinsToWatch.current, coinsToWatch);
    if (shouldInitSocket) {
      console.log("init socket");
      setSocket(pricesSocket.connectToLivePrices(coinsToWatch));
      prevCoinsToWatch.current = coinsToWatch;
    }
  }, [coinsToWatch]);

  useEffect(() => {
    const unsubFocus = navigation.addListener("focus", resumePrices);
    const unsubBlur = navigation.addListener("blur", pausePrices);

    return () => {
      disconnectSocket();
      console.log("removing navigation event listeners");
      unsubFocus();
      unsubBlur();
    };
  }, [socket]);

  return socket;
};
