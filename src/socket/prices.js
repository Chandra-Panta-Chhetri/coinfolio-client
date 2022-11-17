import { io as SocketClient } from "socket.io-client";
import { URLS } from "../constants";
import { sortAlphabetically } from "../utils";

export const coinsToCommaSepIDs = (coins = []) => {
  let commaSepIDs = "";
  for (let coin of coins) {
    if (coin.id !== "") {
      commaSepIDs += `${coin.id},`;
    }
  }
  commaSepIDs = commaSepIDs.substring(0, commaSepIDs.length - 1);
  const ids = commaSepIDs.split(",");
  commaSepIDs = sortAlphabetically(ids).join(",");
  return commaSepIDs;
};

export const connectToLivePrices = (coinsToWatch = []) => {
  if (coinsToWatch.length === 0) {
    return null;
  }

  const socket = SocketClient(`${URLS.BACKEND_BASE_URL}/prices`, {
    query: {
      assets: coinsToCommaSepIDs(coinsToWatch)
    }
  });
  return socket;
};
