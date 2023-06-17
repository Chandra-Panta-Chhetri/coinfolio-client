import { useEffect, useRef, useState } from "react";
import { pricesSocket } from "../socket";
import { isNullOrUndefined } from "../utils";
import { useNavigation } from "@react-navigation/native";
import SOCKET_EVENT_NAMES from "../socket/event-names";

export const updatePriceOfCoins = (newPrices = {}, coins = []) => {
  const updatedCoins = [...coins];
  let wasUpdated = false;

  for (let i = 0; i < updatedCoins.length; i++) {
    let coin = updatedCoins[i];
    if (newPrices[coin.id] !== undefined) {
      updatedCoins[i] = { ...coin, priceUsd: `${newPrices[coin.id]}` };
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
    if (!isNullOrUndefined(socket)) {
      console.log("pause prices");
      socket.emit(SOCKET_EVENT_NAMES.PAUSE_PRICES);
    }
  };

  const resumePrices = () => {
    if (!isNullOrUndefined(socket)) {
      console.log("resume prices");
      socket.emit(SOCKET_EVENT_NAMES.RESUME_PRICES);
    }
  };

  useEffect(() => {
    if (coinsToWatch.length > 0) {
      if (isNullOrUndefined(socket)) {
        const commaSepCoins = pricesSocket.coinsToCommaSepIDs(coinsToWatch);
        setSocket(pricesSocket.connectToLivePrices(commaSepCoins));
        prevCommaSepCoins.current = commaSepCoins;
      } else {
        const newCommaSepCoins = pricesSocket.coinsToCommaSepIDs(coinsToWatch);
        if (prevCommaSepCoins.current !== newCommaSepCoins) {
          // console.log("update coins list");
          socket.emit(SOCKET_EVENT_NAMES.UPDATE_WATCHED_COINS, newCommaSepCoins);
          prevCommaSepCoins.current = newCommaSepCoins;
        }
      }
    }
  }, [coinsToWatch]);

  useEffect(() => {
    let unsubFocus = () => {};
    let unsubBlur = () => {};

    if (!isNullOrUndefined(socket)) {
      unsubFocus = navigation.addListener("focus", resumePrices);
      unsubBlur = navigation.addListener("blur", pausePrices);
    }

    return () => {
      if (!isNullOrUndefined(socket)) {
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
