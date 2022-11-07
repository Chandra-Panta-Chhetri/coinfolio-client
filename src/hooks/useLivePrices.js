import { useEffect, useRef, useState } from "react";
import { pricesSocket } from "../socket";
import { formatNumWorklet } from "../utils";

export const updatePrice = (coinID = "", coins = [], newPrice) =>
  coins.map((coin) => (coin.id === coinID ? { ...coin, priceUsd: `$${formatNumWorklet(newPrice)}` } : coin));

export const useLivePrices = (coinsToWatch = []) => {
  const [socket, setSocket] = useState(null);
  const prevCoinsToWatch = useRef(coinsToWatch);

  const disconnectSocket = () => {
    if (socket !== null) {
      socket.disconnect();
    }
  };

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

  useEffect(() => {
    return disconnectSocket;
  }, []);

  return socket;
};
