import { useEffect, useRef } from "react";
import { pricesSocket } from "../socket";

export const useLivePrices = (coinsToWatch = []) => {
  const socket = useRef(null);

  useEffect(() => {
    //called each time coinsToWatch updates (even if only price updated)
    if (coinsToWatch.length > 0 && socket.current === null) {
      socket.current = pricesSocket.connectToLivePrices(coinsToWatch);
    }
  }, [coinsToWatch]);

  useEffect(() => {
    return () => {
      if (socket.current !== null) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  return socket.current;
};
