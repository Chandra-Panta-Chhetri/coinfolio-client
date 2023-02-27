import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

export const startPortfolioFetch = (id) => ({
  type: PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_FETCH,
  payload: {
    id
  }
});

export const portfolioFetchFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.PORTFOLIO_FETCH_FAIL,
  payload: {
    errorMsg
  }
});

export const portfolioFetchSuccess = (portfolio) => ({
  type: PORTFOLIO_ACTION_TYPES.PORTFOLIO_FETCH_SUCCESS,
  payload: portfolio
});

export const startAddingNewTransaction = (transaction, assetId) => ({
  type: PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION,
  payload: { transaction, assetId }
});

export const addNewTransactionFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL,
  payload: {
    errorMsg
  }
});

export const addNewTransactionSuccess = (newTransaction, successMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_SUCCESS,
  payload: {
    newTransaction,
    successMsg
  }
});

export const startDeletingTransactionById = (transactionId, index) => ({
  type: PORTFOLIO_ACTION_TYPES.START_DELETING_TRANSACTION_BY_ID,
  payload: { transactionId, index }
});

export const deleteTransactionByIdFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_FAIL,
  payload: {
    errorMsg
  }
});

export const deleteTransactionByIdSuccess = (updatedTransactions, successMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_SUCCESS,
  payload: {
    updatedTransactions,
    successMsg
  }
});

export const startUpdatingTransactionById = (transactionId, updatedTransaction, index) => ({
  type: PORTFOLIO_ACTION_TYPES.START_UPDATING_TRANSACTION_BY_ID,
  payload: { transactionId, updatedTransaction, index }
});

export const updateTransactionByIdFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_FAIL,
  payload: {
    errorMsg
  }
});

export const updateTransactionByIdSuccess = (updatedTransactions, successMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_SUCCESS,
  payload: {
    updatedTransactions,
    successMsg
  }
});

export const startTransactionsForAssetFetch = (assetId) => ({
  type: PORTFOLIO_ACTION_TYPES.START_TRANSACTIONS_FOR_ASSET_FETCH,
  payload: { assetId }
});

export const transactionsForAssetFetchFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_FAIL,
  payload: {
    errorMsg
  }
});

export const transactionsForAssetFetchSuccess = (transactions) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_SUCCESS,
  payload: {
    transactions
  }
});

export const startRemovingAllTransactionsForAsset = (assetId) => ({
  type: PORTFOLIO_ACTION_TYPES.START_REMOVING_ALL_TRANSACTIONS_FOR_ASSET,
  payload: { assetId }
});

export const removeAllTransactionsForAssetFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_FAIL,
  payload: {
    errorMsg
  }
});

export const removeAllTransactionsForAssetSuccess = (successMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_SUCCESS,
  payload: {
    successMsg
  }
});
