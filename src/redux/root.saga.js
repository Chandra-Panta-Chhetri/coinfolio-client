import { all, call } from "redux-saga/effects";
import { userSagas } from "./user";
import { notificationSagas } from "./notification";
import { summarySagas } from "./summary";
import { portfolioSagas } from "./portfolio";
import { discoverSagas } from "./discover";
import { marketSagas } from "./market";
import { assetDetailSagas } from "./asset-detail";

function* rootSaga() {
  yield all([
    call(userSagas),
    call(notificationSagas),
    call(summarySagas),
    call(portfolioSagas),
    call(discoverSagas),
    call(marketSagas),
    call(assetDetailSagas)
  ]);
}

export default rootSaga;
