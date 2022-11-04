import { io as SocketClient } from "socket.io-client";
import { URLS } from "../constants";

const coinsToCommaSepIDs = (coins) => {
  let commaSepIds = "";

  for (let coin of coins) {
    commaSepIds += `${coin.id},`;
  }

  return coins.length == 0 ? "ALL" : commaSepIds.substring(0, commaSepIds.length - 1);
};

export const connectToLivePrices = (coinsToWatch = []) => {
  const socket = SocketClient(`${URLS.BACKEND_BASE_URL}/prices`, {
    query: {
      assets: coinsToCommaSepIDs(coinsToWatch)
    }
  });
  return socket;
};
