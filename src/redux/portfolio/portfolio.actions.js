import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

export const startPortfolioOverviewFetch = (id) => ({
  type: PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_OVERVIEW_FETCH,
  payload: {
    id
  }
});

export const portfolioOverviewFetchFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_FAIL,
  payload: {
    errorMsg
  }
});

export const portfolioOverviewFetchSuccess = (portfolio) => ({
  type: PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_SUCCESS,
  payload: portfolio
});

export const startUserPortfoliosFetch = () => ({
  type: PORTFOLIO_ACTION_TYPES.START_USER_PORTFOLIOS_FETCH
});

export const userPortfoliosFetchFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.USER_PORTFOLIOS_FETCH_FAIL,
  payload: errorMsg
});

export const userPortfoliosFetchSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.USER_PORTFOLIOS_FETCH_SUCCESS,
  payload: portfolios
});

export const startAddingNewPortfolio = (portfolio, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_PORTFOLIO,
  payload: { portfolio, onSuccess }
});

export const addNewPortfolioSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.ADDING_NEW_PORTFOLIO_SUCCESS,
  payload: portfolios
});

export const addNewPortfolioFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.ADDING_NEW_PORTFOLIO_FAIL,
  payload: errorMsg
});

export const startUpdatingPortfolio = (portfolio, portfolioId, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.START_UPDATING_PORTFOLIO,
  payload: { portfolio, portfolioId, onSuccess }
});

export const updatePortfolioSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATING_PORTFOLIO_SUCCESS,
  payload: portfolios
});

export const updatePortfolioFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATING_PORTFOLIO_FAIL,
  payload: errorMsg
});

export const startDeletingPortfolio = (portfolioId, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.START_DELETING_PORTFOLIO,
  payload: { portfolioId, onSuccess }
});

export const deletePortfolioSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETING_PORTFOLIO_SUCCESS,
  payload: portfolios
});

export const deletePortfolioFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETING_PORTFOLIO_FAIL,
  payload: errorMsg
});

export const changeActivePortfolio = (portfolio) => ({
  type: PORTFOLIO_ACTION_TYPES.CHANGE_ACTIVE_PORTFOLIO,
  payload: portfolio
});

export const startTransactionCoinsFetch = (query) => ({
  type: PORTFOLIO_ACTION_TYPES.START_TRANSACTION_COINS_FETCH,
  payload: query
});

export const transactionCoinsFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.TRANSACTION_COINS_FETCH_FAIL,
  payload: errorMsg
});

export const transactionCoinsSuccess = (coins) => ({
  type: PORTFOLIO_ACTION_TYPES.TRANSACTION_COINS_FETCH_SUCCESS,
  payload: coins
});

export const startAddingNewTransaction = (transaction, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION,
  payload: { transaction, onSuccess }
});

export const addNewTransactionFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL,
  payload: errorMsg
});

export const addNewTransactionSuccess = (transactions) => ({
  type: PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_SUCCESS,
  payload: transactions
});

export const startDeletingTransaction = (transaction, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.START_DELETING_TRANSACTION,
  payload: { transaction, onSuccess }
});

export const deleteTransactionFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_FAIL,
  payload: errorMsg
});

export const deleteTransactionSuccess = () => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_SUCCESS
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

export const startDeletingHolding = (coinId, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.START_DELETING_HOLDING,
  payload: { coinId, onSuccess }
});

export const deletingHoldingFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETING_HOLDING_FAIL,
  payload: errorMsg
});

export const deletingHoldingSuccess = () => ({
  type: PORTFOLIO_ACTION_TYPES.DELETING_HOLDING_SUCCESS
});

export const startHoldingOverviewFetch = (coinId) => ({
  type: PORTFOLIO_ACTION_TYPES.START_HOLDING_OVERVIEW_FETCH,
  payload: coinId
});

export const holdingOverviewFetchFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.HOLDING_OVERVIEW_FETCH_FAIL,
  payload: errorMsg
});

export const holdingOverviewFetchSuccess = (holdingOverview) => ({
  type: PORTFOLIO_ACTION_TYPES.HOLDING_OVERVIEW_FETCH_SUCCESS,
  payload: holdingOverview
});
