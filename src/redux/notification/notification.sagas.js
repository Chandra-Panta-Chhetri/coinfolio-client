import USER_ACTION_TYPES from "../user/user.action.types";
import SUMMARY_ACTION_TYPES from "../summary/summary.action.types";
import PORTFOLIO_ACTION_TYPES from "../portfolio/portfolio.action.types";
import MARKET_ACTION_TYPES from "../market/market.action.types";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { addErrorNotification, addSuccessNotification } from "./notification.actions";
import DISCOVER_ACTION_TYPES from "../discover/discover.action.types";
import ASSET_DETAIL_ACTION_TYPES from "../asset-detail/asset-detail.action.types";
import CURRENCY_ACTION_TYPES from "../currency/currency.action.types";

function* showErrorNotification({ payload: errorMsg }) {
  console.error(errorMsg);
  yield put(addErrorNotification(errorMsg));
}

function* showSuccessNotification({ payload: successMsg }) {
  yield put(addSuccessNotification(successMsg));
}

function* watchErrorNotification() {
  yield takeEvery(
    [
      USER_ACTION_TYPES.REGISTER_FAIL,
      USER_ACTION_TYPES.LOG_OUT_FAIL,
      USER_ACTION_TYPES.LOGIN_FAIL,
      SUMMARY_ACTION_TYPES.FETCH_TOP_COINS_FAIL,
      SUMMARY_ACTION_TYPES.FETCH_NEWS_SUMMARY_FAIL,
      SUMMARY_ACTION_TYPES.FETCH_GAINERS_LOSERS_FAIL,
      SUMMARY_ACTION_TYPES.FETCH_GLOBAL_SUMMARY_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_NEWS_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_EVENTS_FAIL,
      ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS_FAIL,
      DISCOVER_ACTION_TYPES.FETCH_EVENTS_FAIL,
      DISCOVER_ACTION_TYPES.FETCH_NEWS_FAIL,
      DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS_FAIL,
      DISCOVER_ACTION_TYPES.FETCH_MORE_EVENTS_FAIL,
      MARKET_ACTION_TYPES.FETCH_MARKETS_FAIL,
      MARKET_ACTION_TYPES.FETCH_MORE_MARKETS_FAIL,
      MARKET_ACTION_TYPES.FETCH_SEARCH_RESULTS_FAIL,
      PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW_FAIL,
      PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION_FAIL,
      PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_FAIL,
      PORTFOLIO_ACTION_TYPES.DELETE_HOLDING_FAIL,
      PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO_FAIL,
      PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO_FAIL,
      PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS_FAIL,
      PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW_FAIL,
      PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS_FAIL,
      PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO_FAIL,
      PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_FAIL,
      CURRENCY_ACTION_TYPES.FETCH_CURRENCIES_FAIL,
      CURRENCY_ACTION_TYPES.FETCH_MORE_CURRENCIES_FAIL
    ],
    showErrorNotification
  );
}

function* watchSuccessNotification() {
  yield takeEvery([], showSuccessNotification);
}

export default function* notificationSagas() {
  yield all([call(watchErrorNotification), call(watchSuccessNotification)]);
}
