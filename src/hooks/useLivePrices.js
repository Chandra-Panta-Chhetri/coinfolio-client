import { useEffect, useRef, useState } from "react";
import { pricesSocket } from "../socket";
import { formatNumWorklet } from "../utils";
import { useNavigation } from "@react-navigation/native";

export const updatePrice = (coinID = "", coins = [], newPrice) =>
  coins.map((coin) => (coin.id === coinID ? { ...coin, priceUsd: `$${formatNumWorklet(newPrice)}` } : coin));

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
    const initializeSocket = prevCoinsToWatch.current.length !== coinsToWatch.length;
    if (initializeSocket) {
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
