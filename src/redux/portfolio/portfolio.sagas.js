import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  portfolioOverviewFetchFail,
  addNewTransactionFail,
  deleteTransactionFail,
  updateTransactionByIdFail,
  portfolioOverviewFetchSuccess,
  addNewTransactionSuccess,
  updateTransactionByIdSuccess,
  userPortfoliosFetchSuccess,
  userPortfoliosFetchFail,
  addNewPortfolioSuccess,
  addNewPortfolioFail,
  updatePortfolioFail,
  updatePortfolioSuccess,
  deletePortfolioSuccess,
  deletePortfolioFail,
  changeActivePortfolio,
  transactionCoinsFail,
  transactionCoinsSuccess,
  startPortfolioOverviewFetch,
  deletingHoldingSuccess,
  deletingHoldingFail,
  holdingOverviewFetchFail,
  holdingOverviewFetchSuccess,
  deleteTransactionSuccess,
  startHoldingOverviewFetch
} from "./portfolio.actions";
import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";
import {
  selectActivePortfolio,
  selectHoldingOverview,
  selectTransactions,
  selectUserPortfolios
} from "./portfolio.selectors";
import { selectUserToken } from "../user";
import { portfolioAPI } from "../../api";

function* fetchPortfolio({ payload: { id } }) {
  try {
    const authToken = yield select(selectUserToken);
    const portfolio = yield portfolioAPI.getOverview(id, authToken);
    yield put(portfolioOverviewFetchSuccess(portfolio));
  } catch (err) {
    yield put(portfolioOverviewFetchFail("There was a problem getting your portfolio details"));
  }
}

function* fetchUserPortfolios() {
  try {
    const authToken = yield select(selectUserToken);
    const portfolios = yield portfolioAPI.getUserPortfolios(authToken);
    yield put(userPortfoliosFetchSuccess(portfolios));
  } catch (err) {
    yield put(userPortfoliosFetchFail("Failed to fetch all portfolios"));
  }
}

function* addNewPortfolio({ payload: { portfolio, onSuccess } }) {
  try {
    const authToken = yield select(selectUserToken);
    const prevPortfolios = yield select(selectUserPortfolios);
    const newPortfolio = yield portfolioAPI.createPortfolio(authToken, portfolio);
    const updatedPortfolios = [...prevPortfolios, newPortfolio];
    yield put(addNewPortfolioSuccess(updatedPortfolios));
    if (onSuccess !== undefined) {
      yield onSuccess();
    }
  } catch (err) {
    yield put(addNewPortfolioFail("Failed to create new portfolio"));
  }
}

function* updatePortfolio({ payload: { portfolio, portfolioId, onSuccess } }) {
  try {
    const authToken = yield select(selectUserToken);
    const portfolios = yield select(selectUserPortfolios);
    const updatedPortfolio = yield portfolioAPI.updatePortfolio(authToken, portfolio, portfolioId);
    const updatedPortfolios = portfolios.map((p) => (p?.id === portfolioId ? updatedPortfolio : p));
    yield put(updatePortfolioSuccess(updatedPortfolios));
    if (onSuccess !== undefined) {
      yield onSuccess();
    }
  } catch (err) {
    yield put(updatePortfolioFail("Failed to update portfolio"));
  }
}

function* deletePortfolio({ payload: { portfolioId, onSuccess } }) {
  try {
    const authToken = yield select(selectUserToken);
    const portfolios = yield select(selectUserPortfolios);
    const activePortfolio = yield select(selectActivePortfolio);
    yield portfolioAPI.deletePortfolio(authToken, portfolioId);
    const updatedPortfolios = portfolios.filter((p) => p?.id !== portfolioId);
    yield put(deletePortfolioSuccess(updatedPortfolios));
    if (activePortfolio?.id === portfolioId) {
      yield put(changeActivePortfolio(updatedPortfolios?.length > 0 ? updatedPortfolios[0] : null));
    }
    if (onSuccess !== undefined) {
      yield onSuccess();
    }
  } catch (err) {
    yield put(deletePortfolioFail("Failed to delete portfolio"));
  }
}

function* fetchTransactionCoins({ payload: query }) {
  try {
    const authToken = yield select(selectUserToken);
    const coins = yield portfolioAPI.getTransactionCoins(authToken, query);
    yield put(transactionCoinsSuccess(coins));
  } catch (err) {
    yield put(transactionCoinsFail("Failed to load transaction coins"));
  }
}

function* addNewTransaction({ payload: { transaction, onSuccess } }) {
  try {
    const authToken = yield select(selectUserToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const oldTransactions = yield select(selectTransactions);
    const newTransaction = yield portfolioAPI.addTransaction(authToken, transaction, activePortfolio?.id);
    const updatedTransactions = yield [...oldTransactions, newTransaction];
    yield put(addNewTransactionSuccess(updatedTransactions));
    yield put(startPortfolioOverviewFetch(activePortfolio?.id));
    if (onSuccess !== undefined) {
      yield onSuccess();
    }
  } catch (err) {
    yield put(addNewTransactionFail("There was a problem adding a new transaction"));
  }
}

function* deleteTransaction({ payload: { transaction, onSuccess } }) {
  try {
    const authToken = yield select(selectUserToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const holdingOverview = yield select(selectHoldingOverview);
    yield portfolioAPI.deleteTransaction(transaction, activePortfolio?.id, authToken);
    yield put(deleteTransactionSuccess());
    if (holdingOverview !== null) {
      yield put(startHoldingOverviewFetch(holdingOverview?.coinId));
      yield put(startPortfolioOverviewFetch(activePortfolio?.id));
    }
    if (onSuccess !== undefined) {
      yield onSuccess();
    }
  } catch (err) {
    yield put(deleteTransactionFail("Deleting transaction failed"));
  }
}

function* updateTransactionById({ payload: { transactionId, updatedTransaction, index } }) {
  try {
    const transactions = yield select(selectTransactions);
    transactions[index] = yield updatedTransaction;
    const updatedTransactions = yield [...transactions];
    yield put(updateTransactionByIdSuccess(updatedTransactions, `Transaction details have been updated`));
  } catch (err) {
    yield put(updateTransactionByIdFail("There was a problem updating the transaction details"));
  }
}

function* deleteHolding({ payload: { coinId, onSuccess } }) {
  try {
    const authToken = yield select(selectUserToken);
    const activePortfolio = yield select(selectActivePortfolio);
    yield portfolioAPI.removeHolding(coinId, activePortfolio?.id, authToken);
    yield put(deletingHoldingSuccess());
    if (onSuccess !== undefined) {
      yield onSuccess();
    }
    yield put(startPortfolioOverviewFetch(activePortfolio?.id));
  } catch (err) {
    yield put(deletingHoldingFail("There was a problem removing holding"));
  }
}

function* fetchHoldingOverview({ payload: coinId }) {
  try {
    const authToken = yield select(selectUserToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const holdingOverview = yield portfolioAPI.getHoldingOverview(coinId, activePortfolio?.id, authToken);
    yield put(holdingOverviewFetchSuccess(holdingOverview));
  } catch (err) {
    yield put(holdingOverviewFetchFail("Failed to get holding overview"));
  }
}

function* watchPortfolioFetchStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_OVERVIEW_FETCH, fetchPortfolio);
}

function* watchAddingNewTransaction() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION, addNewTransaction);
}

function* watchDeleteTransaction() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_DELETING_TRANSACTION, deleteTransaction);
}

function* watchUpdateTransactionByIdStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_UPDATING_TRANSACTION_BY_ID, updateTransactionById);
}

function* watchDeleteHolding() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_DELETING_HOLDING, deleteHolding);
}

function* watchUserPortfoliosFetchStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_USER_PORTFOLIOS_FETCH, fetchUserPortfolios);
}

function* watchAddNewPortfolio() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_PORTFOLIO, addNewPortfolio);
}

function* watchUpdatePortfolio() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_UPDATING_PORTFOLIO, updatePortfolio);
}

function* watchDeletePortfolio() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_DELETING_PORTFOLIO, deletePortfolio);
}

function* watchTransactionCoinsFetch() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_TRANSACTION_COINS_FETCH, fetchTransactionCoins);
}

function* watchHoldingOverviewFetch() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_HOLDING_OVERVIEW_FETCH, fetchHoldingOverview);
}

export default function* portfolioSagas() {
  yield all([
    call(watchPortfolioFetchStart),
    call(watchAddingNewTransaction),
    call(watchUserPortfoliosFetchStart),
    call(watchAddNewPortfolio),
    call(watchUpdatePortfolio),
    call(watchDeletePortfolio),
    call(watchTransactionCoinsFetch),
    call(watchDeleteHolding),
    call(watchHoldingOverviewFetch),
    call(watchDeleteTransaction)
  ]);
}
