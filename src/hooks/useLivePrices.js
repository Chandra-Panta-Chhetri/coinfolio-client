import { useEffect, useRef, useState } from "react";
import { pricesSocket } from "../socket";
import { formatNumWorklet } from "../utils";
import { useNavigation } from "@react-navigation/native";

export const updatePriceOfCoins = (newPrices = {}, coins = []) => {
  const updatedCoins = [...coins];
  let wasUpdated = false;

  for (let i = 0; i < updatedCoins.length; i++) {
    let coin = updatedCoins[i];
    if (newPrices[coin.id] !== undefined) {
      updatedCoins[i] = { ...coin, priceUsd: `$${formatNumWorklet(newPrices[coin.id])}` };
      wasUpdated = true;
    }
  }
  return { wasUpdated, coins: updatedCoins };
};

export const useLivePrices = (coinsToWatch = []) => {
  const [socket, setSocket] = useState(null);
  const prevCommaSepCoins = useRef("");
  const navigation = useNavigation();

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
    if (coinsToWatch.length > 0) {
      if (socket === null) {
        // console.log("init socket");
        const commaSepCoins = pricesSocket.coinsToCommaSepIDs(coinsToWatch);
        setSocket(pricesSocket.connectToLivePrices(commaSepCoins));
        prevCommaSepCoins.current = commaSepCoins;
      } else {
        const newCommaSepCoins = pricesSocket.coinsToCommaSepIDs(coinsToWatch);
        if (prevCommaSepCoins.current !== newCommaSepCoins) {
          // console.log("update coins list");
          socket.emit("update coins", newCommaSepCoins);
          prevCommaSepCoins.current = newCommaSepCoins;
        }
      }
    }
  }, [coinsToWatch]);

  useEffect(() => {
    let unsubFocus = () => {};
    let unsubBlur = () => {};

    if (socket !== null) {
      unsubFocus = navigation.addListener("focus", resumePrices);
      unsubBlur = navigation.addListener("blur", pausePrices);
    }

    return () => {
      if (socket !== null) {
        // console.log("disconnect socket");
        socket.disconnect();
        // console.log("removing navigation event listeners");
        unsubFocus();
        unsubBlur();
      }
    };
  }, [socket]);

  return socket;
};
