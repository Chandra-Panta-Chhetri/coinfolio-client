import { useEffect, useRef, useState } from "react";
import { pricesSocket } from "../socket";
import { formatNumWorklet } from "../utils";
import { useNavigation } from "@react-navigation/native";

export const updatePrice = (coinID = "", coins = [], newPrice) =>
  coins.map((coin) => (coin.id === coinID ? { ...coin, priceUsd: `$${formatNumWorklet(newPrice)}` } : coin));

export const useLivePrices = (coinsToWatch = []) => {
  const [socket, setSocket] = useState(null);
  const prevCoinsToWatch = useRef(coinsToWatch);
  const navigation = useNavigation();

  const disconnectSocket = () => {
    if (socket !== null) {
      socket.disconnect();
    }
  };

  const pausePrices = () => {
    if (socket !== null) {
      console.log("pausing prices");
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
    const unsubFocus = navigation.addListener("focus", resumePrices);
    const unsubBlur = navigation.addListener("blur", pausePrices);

    return () => {
      unsubFocus();
      unsubBlur();
    };
  }, [socket]);

  useEffect(() => {
    //called each time coinsToWatch updates (even if only price updated)
    const initializeSocket = prevCoinsToWatch.current.length !== coinsToWatch.length;
    if (initializeSocket) {
      console.log("init socket");
      disconnectSocket();
      setSocket(pricesSocket.connectToLivePrices(coinsToWatch));
      prevCoinsToWatch.current = coinsToWatch;
    }
  }, [coinsToWatch]);

  useEffect(() => disconnectSocket, []);

  return socket;
};
