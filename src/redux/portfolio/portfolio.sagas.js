import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  fetchPortfolioOverviewFail,
  addNewTransactionFail,
  deleteTransactionFail,
  fetchPortfolioOverviewSuccess,
  addNewTransactionSuccess,
  fetchUserPortfoliosSuccess,
  fetchUserPortfoliosFail,
  addNewPortfolioSuccess,
  addNewPortfolioFail,
  updatePortfolioFail,
  updatePortfolioSuccess,
  deletePortfolioSuccess,
  deletePortfolioFail,
  changeActivePortfolio,
  fetchTransactionCoinsFail,
  fetchTransactionCoinsSuccess,
  fetchPortfolioOverview,
  deleteHoldingSuccess,
  deleteHoldingFail,
  fetchHoldingOverviewFail,
  fetchHoldingOverviewSuccess,
  deleteTransactionSuccess,
  fetchHoldingOverview,
  updateTransactionSuccess,
  updateTransactionFail
} from "./portfolio.actions";
import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";
import {
  selectActivePortfolio,
  selectHoldingOverview,
  selectTransactions,
  selectUserPortfolios
} from "./portfolio.selectors";
import { selectAuthToken } from "../user";
import { portfolioAPI } from "../../api";
import { isNullOrUndefined } from "../../utils";
import SCREEN_NAMES from "../../navigators/screen-names";

function* fetchPortfolio({ payload: { id } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const portfolio = yield portfolioAPI.getOverview(id, authToken);
    if (!isNullOrUndefined(portfolio)) {
      yield put(fetchPortfolioOverviewSuccess(portfolio));
    } else {
      throw new Error("Failed to get portfolio");
    }
  } catch (err) {
    console.log(err);
    yield put(fetchPortfolioOverviewFail("Failed to get portfolio"));
  }
}

function* fetchUserPortfolios() {
  try {
    const authToken = yield select(selectAuthToken);
    const portfolios = yield portfolioAPI.getUserPortfolios(authToken);
    if (!isNullOrUndefined(portfolios)) {
      yield put(fetchUserPortfoliosSuccess(portfolios));
    } else {
      throw new Error("Failed to get portfolios");
    }
  } catch (err) {
    console.log(err);
    yield put(fetchUserPortfoliosFail("Failed to get portfolios"));
  }
}

function* addNewPortfolio({ payload: { portfolio, onSuccess } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const prevPortfolios = yield select(selectUserPortfolios);
    const newPortfolio = yield portfolioAPI.createPortfolio(authToken, portfolio);
    if (!isNullOrUndefined(newPortfolio)) {
      const updatedPortfolios = yield [...prevPortfolios, newPortfolio];
      yield put(addNewPortfolioSuccess(updatedPortfolios));
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
    } else {
      throw new Error("Failed to create new portfolio");
    }
  } catch (err) {
    yield put(addNewPortfolioFail("Failed to create new portfolio"));
  }
}

function* updatePortfolio({ payload: { portfolio, portfolioId, onSuccess } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const portfolios = yield select(selectUserPortfolios);
    const updatedPortfolio = yield portfolioAPI.updatePortfolio(authToken, portfolio, portfolioId);
    if (!isNullOrUndefined(updatedPortfolio)) {
      const updatedPortfolios = portfolios.map((p) => (p?.id === portfolioId ? updatedPortfolio : p));
      yield put(updatePortfolioSuccess(updatedPortfolios));
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
    } else {
      throw new Error("Failed to update portfolio");
    }
  } catch (err) {
    yield put(updatePortfolioFail("Failed to update portfolio"));
  }
}

function* deletePortfolio({ payload: { portfolioId, onSuccess } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const portfolios = yield select(selectUserPortfolios);
    const activePortfolio = yield select(selectActivePortfolio);
    const deletedPortfolio = yield portfolioAPI.deletePortfolio(authToken, portfolioId);
    if (!isNullOrUndefined(deletedPortfolio)) {
      const updatedPortfolios = portfolios.filter((p) => p?.id !== portfolioId);
      yield put(deletePortfolioSuccess(updatedPortfolios));
      if (activePortfolio?.id === portfolioId) {
        yield put(changeActivePortfolio(updatedPortfolios?.length > 0 ? updatedPortfolios[0]?.id : null));
      }
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
    } else {
      throw new Error("Failed to delete portfolio");
    }
  } catch (err) {
    yield put(deletePortfolioFail("Failed to delete portfolio"));
  }
}

function* fetchTransactionCoins({ payload: query }) {
  try {
    const authToken = yield select(selectAuthToken);
    const coins = yield portfolioAPI.getTransactionCoins(authToken, query);
    if (!isNullOrUndefined(coins)) {
      yield put(fetchTransactionCoinsSuccess(coins));
    } else {
      throw new Error("Failed to get transaction coins");
    }
  } catch (err) {
    yield put(fetchTransactionCoinsFail("Failed to get transaction coins"));
  }
}

function* addNewTransaction({ payload: { transaction, onSuccess, startingScreen } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const oldTransactions = yield select(selectTransactions);
    const holdingOverview = yield select(selectHoldingOverview);
    const newTransaction = yield portfolioAPI.addTransaction(authToken, transaction, activePortfolio?.id);
    if (!isNullOrUndefined(newTransaction)) {
      const updatedTransactions = yield [...oldTransactions, newTransaction];
      yield put(addNewTransactionSuccess(updatedTransactions));
      if (startingScreen === SCREEN_NAMES.HOLDING_OVERVIEW && !isNullOrUndefined(holdingOverview)) {
        yield put(fetchHoldingOverview(holdingOverview?.coinId));
      }
      yield put(fetchPortfolioOverview(activePortfolio?.id));
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
    } else {
      throw new Error("Failed to create new transaction");
    }
  } catch (err) {
    console.log(err);
    yield put(addNewTransactionFail("Failed to create new transaction"));
  }
}

function* deleteTransaction({ payload: { transaction, onSuccess } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const holdingOverview = yield select(selectHoldingOverview);
    const transactionsForHolding = yield select(selectTransactions);
    const isLastTransaction = transactionsForHolding?.length - 1 === 0;
    const deletedTransaction = yield portfolioAPI.deleteTransaction(transaction, activePortfolio?.id, authToken);
    if (!isNullOrUndefined(deletedTransaction)) {
      yield put(deleteTransactionSuccess());
      if (!isNullOrUndefined(holdingOverview)) {
        if (!isLastTransaction) {
          yield put(fetchHoldingOverview(holdingOverview?.coinId));
        }
        yield put(fetchPortfolioOverview(activePortfolio?.id));
      }
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
    } else {
      throw new Error("Failed to delete transaction");
    }
  } catch (err) {
    yield put(deleteTransactionFail("Failed to delete transaction"));
  }
}

function* updateTransaction({ payload: { transactionId, transaction, onSuccess } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const holdingOverview = yield select(selectHoldingOverview);
    const updatedTransaction = yield portfolioAPI.updateTransaction(
      transaction,
      activePortfolio?.id,
      authToken,
      transactionId
    );
    if (!isNullOrUndefined(updatedTransaction)) {
      yield put(updateTransactionSuccess());
      if (!isNullOrUndefined(holdingOverview)) {
        yield put(fetchHoldingOverview(holdingOverview?.coinId));
        yield put(fetchPortfolioOverview(activePortfolio?.id));
      }
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
    } else {
      throw new Error("Failed to update transaction");
    }
  } catch (err) {
    console.log("FAILED TRANSACTION UPDATE", err);
    yield put(updateTransactionFail("Failed to update transaction"));
  }
}

function* deleteHolding({ payload: { coinId, onSuccess } }) {
  try {
    const authToken = yield select(selectAuthToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const removedHolding = yield portfolioAPI.removeHolding(coinId, activePortfolio?.id, authToken);
    if (!isNullOrUndefined(removedHolding)) {
      yield put(deleteHoldingSuccess());
      if (!isNullOrUndefined(onSuccess)) {
        yield onSuccess();
      }
      yield put(fetchPortfolioOverview(activePortfolio?.id));
    } else {
      throw new Error("Failed to remove holding");
    }
  } catch (err) {
    yield put(deleteHoldingFail("Failed to remove holding"));
  }
}

function* getHoldingOverview({ payload: coinId }) {
  try {
    const authToken = yield select(selectAuthToken);
    const activePortfolio = yield select(selectActivePortfolio);
    const holdingOverview = yield portfolioAPI.getHoldingOverview(coinId, activePortfolio?.id, authToken);
    if (!isNullOrUndefined(holdingOverview)) {
      yield put(fetchHoldingOverviewSuccess(holdingOverview));
    } else {
      throw new Error("Failed to get holding overview");
    }
  } catch (err) {
    yield put(fetchHoldingOverviewFail("Failed to get holding overview"));
  }
}

function* watchFetchPortfolioOverview() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW, fetchPortfolio);
}

function* watchAddNewTransaction() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION, addNewTransaction);
}

function* watchDeleteTransaction() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION, deleteTransaction);
}

function* watchUpdateTransaction() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION, updateTransaction);
}

function* watchDeleteHolding() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.DELETE_HOLDING, deleteHolding);
}

function* watchFetchUserPortfolios() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS, fetchUserPortfolios);
}

function* watchAddNewPortfolio() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO, addNewPortfolio);
}

function* watchUpdatePortfolio() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO, updatePortfolio);
}

function* watchDeletePortfolio() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO, deletePortfolio);
}

function* watchFetchTransactionCoins() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS, fetchTransactionCoins);
}

function* watchFetchHoldingOverview() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW, getHoldingOverview);
}

export default function* portfolioSagas() {
  yield all([
    call(watchFetchPortfolioOverview),
    call(watchAddNewTransaction),
    call(watchFetchUserPortfolios),
    call(watchAddNewPortfolio),
    call(watchUpdatePortfolio),
    call(watchDeletePortfolio),
    call(watchFetchTransactionCoins),
    call(watchDeleteHolding),
    call(watchFetchHoldingOverview),
    call(watchDeleteTransaction),
    call(watchUpdateTransaction)
  ]);
}
