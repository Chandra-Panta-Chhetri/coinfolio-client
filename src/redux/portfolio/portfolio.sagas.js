import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  portfolioOverviewFetchFail,
  addNewTransactionFail,
  deleteTransactionByIdFail,
  updateTransactionByIdFail,
  transactionsForAssetFetchFail,
  removeAllTransactionsForAssetFail,
  portfolioOverviewFetchSuccess,
  addNewTransactionSuccess,
  deleteTransactionByIdSuccess,
  updateTransactionByIdSuccess,
  transactionsForAssetFetchSuccess,
  removeAllTransactionsForAssetSuccess,
  userPortfoliosFetchSuccess,
  userPortfoliosFetchFail,
  addNewPortfolioSuccess,
  addNewPortfolioFail,
  updatePortfolioFail,
  updatePortfolioSuccess,
  deletePortfolioSuccess,
  deletePortfolioFail,
  changeActivePortfolio
} from "./portfolio.actions";
import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";
import { selectActivePortfolio, selectTransactions, selectUserPortfolios } from "./portfolio.selectors";
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

function* addNewPortfolio({ payload: portfolio }) {
  try {
    const authToken = yield select(selectUserToken);
    const prevPortfolios = yield select(selectUserPortfolios);
    const newPortfolio = yield portfolioAPI.createPortfolio(authToken, portfolio);
    const updatedPortfolios = [...prevPortfolios, newPortfolio];
    yield put(addNewPortfolioSuccess(updatedPortfolios));
  } catch (err) {
    yield put(addNewPortfolioFail("Failed to create new portfolio"));
  }
}

function* updatePortfolio({ payload: { portfolio, portfolioId } }) {
  try {
    const authToken = yield select(selectUserToken);
    const portfolios = yield select(selectUserPortfolios);
    const updatedPortfolio = yield portfolioAPI.updatePortfolio(authToken, portfolio, portfolioId);
    const updatedPortfolios = portfolios.map((p) => (p?.id === portfolioId ? updatedPortfolio : p));
    yield put(updatePortfolioSuccess(updatedPortfolios));
  } catch (err) {
    yield put(updatePortfolioFail("Failed to update portfolio"));
  }
}

function* deletePortfolio({ payload: portfolioId }) {
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
  } catch (err) {
    yield put(deletePortfolioFail("Failed to delete portfolio"));
  }
}

function* addNewTransaction({ payload: { transaction, assetId } }) {
  try {
    const newTransaction = yield {};
    yield put(addNewTransactionSuccess(newTransaction, `New transaction added!`));
  } catch (err) {
    yield put(addNewTransactionFail("There was a problem adding a new transaction"));
  }
}

function* deleteTransactionById({ payload: { transactionId, index } }) {
  try {
    const transactions = yield select(selectTransactions);
    yield transactions.splice(index, 1);
    const updatedTransactions = yield [...transactions];
    yield put(deleteTransactionByIdSuccess(updatedTransactions, `Transaction has been deleted`));
  } catch (err) {
    yield put(deleteTransactionByIdFail("There was a problem deleting the transaction"));
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

function* fetchTransactionsForAsset({ payload: { assetId } }) {
  try {
    const transactions = yield [];
    yield put(transactionsForAssetFetchSuccess(transactions));
  } catch (err) {
    yield put(transactionsForAssetFetchFail("There was a problem getting the transactions"));
  }
}

function* removeAllTransactionsForAsset({ payload: { assetId } }) {
  try {
    yield put(removeAllTransactionsForAssetSuccess(`All transactions have been removed`));
  } catch (err) {
    yield put(removeAllTransactionsForAssetFail("There was a problem removing all the transactions"));
  }
}

function* watchPortfolioFetchStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_OVERVIEW_FETCH, fetchPortfolio);
}

function* watchAddingNewTransactionStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION, addNewTransaction);
}

function* watchDeleteTransactionByIdStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_DELETING_TRANSACTION_BY_ID, deleteTransactionById);
}

function* watchUpdateTransactionByIdStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_UPDATING_TRANSACTION_BY_ID, updateTransactionById);
}

function* watchTransactionsForAssetFetchStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_TRANSACTIONS_FOR_ASSET_FETCH, fetchTransactionsForAsset);
}

function* watchRemoveAllTransactionsForAssetStart() {
  yield takeLatest(PORTFOLIO_ACTION_TYPES.START_REMOVING_ALL_TRANSACTIONS_FOR_ASSET, removeAllTransactionsForAsset);
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

export default function* portfolioSagas() {
  yield all([
    call(watchPortfolioFetchStart),
    call(watchAddingNewTransactionStart),
    call(watchDeleteTransactionByIdStart),
    call(watchUpdateTransactionByIdStart),
    call(watchTransactionsForAssetFetchStart),
    call(watchRemoveAllTransactionsForAssetStart),
    call(watchUserPortfoliosFetchStart),
    call(watchAddNewPortfolio),
    call(watchUpdatePortfolio),
    call(watchDeletePortfolio)
  ]);
}
