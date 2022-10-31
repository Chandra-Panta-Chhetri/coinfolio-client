import { io as SocketClient } from "socket.io-client";
import { GLOBAL_CONSTANTS } from "../constants";

const convertCoinsToComma = (coins) => {
  let commaSepIds = "";

  for (let coin of coins) {
    commaSepIds += `${coin.id},`;
  }

  return coins.length == 0 ? "ALL" : commaSepIds.substring(0, commaSepIds.length - 1);
};

export const connectToLivePrices = (coinsToWatch = []) => {
  const socket = SocketClient(`${GLOBAL_CONSTANTS.BACKEND_BASE_URL}/prices`, {
    query: {
      assets: convertCoinsToComma(coinsToWatch)
    }
  });
  return socket;
};
