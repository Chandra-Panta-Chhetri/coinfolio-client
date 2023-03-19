import USER_ACTION_TYPES from "../user/user.action.types";
import SUMMARY_ACTION_TYPES from "../summary/summary.action.types";
import PORTFOLIO_ACTION_TYPES from "../portfolio/portfolio.action.types";
import MARKET_ACTION_TYPES from "../market/market.action.types";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { addErrorNotification, addSuccessNotification } from "./notification.actions";
import DISCOVER_ACTION_TYPES from "../discover/discover.action.types";

function* showErrorNotification({ payload: errorMsg }) {
  yield put(addErrorNotification(errorMsg));
}

function* showSuccessNotification({ payload: successMsg }) {
  yield put(addSuccessNotification(successMsg));
}

function* watchErrorNotifications() {
  yield takeEvery(
    [
      // USER_ACTION_TYPES.REGISTER_FAIL,
      // USER_ACTION_TYPES.LOG_OUT_FAIL,
      // USER_ACTION_TYPES.LOGIN_FAIL,
      // SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_FAIL,
      // SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FAIL,
      // SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_FAIL,
      // SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_FAIL,
      // PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_FAIL,
      // PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL,
      // PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_FAIL,
      // PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_FAIL,
      // PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_FAIL,
      // MARKET_ACTION_TYPES.INITIAL_MARKETS_FAIL,
      // MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_FAIL,
      // MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_FAIL,
      // DISCOVER_ACTION_TYPES.INITIAL_EVENTS_FAIL,
      // DISCOVER_ACTION_TYPES.INITIAL_NEWS_FAIL,
      // DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_FAIL,
      // DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_FAIL
    ],
    showErrorNotification
  );
}

function* watchSuccessNotifications() {
  yield takeEvery([], showSuccessNotification);
}

export default function* notificationSagas() {
  yield all([call(watchErrorNotifications), call(watchSuccessNotifications)]);
}
