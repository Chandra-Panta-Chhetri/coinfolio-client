import { all, call } from "redux-saga/effects";
import userSagas from "./user/user.sagas";
import notificationSagas from "./notification/notification.sagas";

function* rootSaga() {
  yield all([call(userSagas), call(notificationSagas)]);
}

export default rootSaga;
