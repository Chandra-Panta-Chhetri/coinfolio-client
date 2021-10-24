import { all, call } from "redux-saga/effects";
import { userSagas } from "./user";
import { notificationSagas } from "./notification";
import { summarySagas } from "./summary";
import { portfolioSagas } from "./portfolio";
import { newsSagas } from "./news";

function* rootSaga() {
  yield all([
    call(userSagas),
    call(notificationSagas),
    call(summarySagas),
    call(portfolioSagas),
    call(newsSagas)
  ]);
}

export default rootSaga;
