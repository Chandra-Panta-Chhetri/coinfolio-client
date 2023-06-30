import { io as SocketClient } from "socket.io-client";
import { GLOBAL_CONSTANTS } from "../constants";
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

export const connectToLivePrices = (commaSepCoins = "") => {
  if (commaSepCoins === "") {
    return null;
  }

  const socket = SocketClient(`${GLOBAL_CONSTANTS.BACKEND_BASE_URL}/prices`, {
    query: {
      coins: commaSepCoins
    }
  });
  return socket;
};
