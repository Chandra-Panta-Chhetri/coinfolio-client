import { all, call } from "redux-saga/effects";
import userSagas from "./user/user.sagas";
import notificationSagas from "./notification/notification.sagas";
import summarySagas from "./summary/summary.sagas";
import portfolioSagas from "./portfolio/portfolio.sagas";
import newsSagas from "./news/news.sagas";

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
