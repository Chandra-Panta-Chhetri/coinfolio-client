import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

export const fetchPortfolioOverview = (id) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW,
  payload: {
    id
  }
});

export const fetchPortfolioOverviewFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW_FAIL,
  payload: errorMsg
});

export const fetchPortfolioOverviewSuccess = (portfolio) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW_SUCCESS,
  payload: portfolio
});

export const fetchUserPortfolios = () => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS
});

export const fetchUserPortfoliosFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS_FAIL,
  payload: errorMsg
});

export const fetchUserPortfoliosSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS_SUCCESS,
  payload: portfolios
});

export const addNewPortfolio = (portfolio, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO,
  payload: { portfolio, onSuccess }
});

export const addNewPortfolioSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO_SUCCESS,
  payload: portfolios
});

export const addNewPortfolioFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO_FAIL,
  payload: errorMsg
});

export const updatePortfolio = (portfolio, portfolioId, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO,
  payload: { portfolio, portfolioId, onSuccess }
});

export const updatePortfolioSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO_SUCCESS,
  payload: portfolios
});

export const updatePortfolioFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO_FAIL,
  payload: errorMsg
});

export const deletePortfolio = (portfolioId, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO,
  payload: { portfolioId, onSuccess }
});

export const deletePortfolioSuccess = (portfolios) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO_SUCCESS,
  payload: portfolios
});

export const deletePortfolioFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO_FAIL,
  payload: errorMsg
});

export const changeActivePortfolio = (portfolio) => ({
  type: PORTFOLIO_ACTION_TYPES.CHANGE_ACTIVE_PORTFOLIO,
  payload: portfolio
});

export const fetchTransactionCoins = (query) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS,
  payload: query
});

export const fetchTransactionCoinsFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS_FAIL,
  payload: errorMsg
});

export const fetchTransactionCoinsSuccess = (coins) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS_SUCCESS,
  payload: coins
});

export const addNewTransaction = (transaction, onSuccess, startingScreen) => ({
  type: PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION,
  payload: { transaction, onSuccess, startingScreen }
});

export const addNewTransactionFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION_FAIL,
  payload: errorMsg
});

export const addNewTransactionSuccess = (transactions) => ({
  type: PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION_SUCCESS,
  payload: transactions
});

export const deleteTransaction = (transaction, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION,
  payload: { transaction, onSuccess }
});

export const deleteTransactionFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_FAIL,
  payload: errorMsg
});

export const deleteTransactionSuccess = () => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_SUCCESS
});

export const updateTransaction = (transactionId, transactionUpdates, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION,
  payload: { transactionId, transactionUpdates, onSuccess }
});

export const updateTransactionFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_FAIL,
  payload: errorMsg
});

export const updateTransactionSuccess = () => ({
  type: PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_SUCCESS
});

export const deleteHolding = (coinId, onSuccess) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_HOLDING,
  payload: { coinId, onSuccess }
});

export const deleteHoldingFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_HOLDING_FAIL,
  payload: errorMsg
});

export const deleteHoldingSuccess = () => ({
  type: PORTFOLIO_ACTION_TYPES.DELETE_HOLDING_SUCCESS
});

export const fetchHoldingOverview = (coinId) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW,
  payload: coinId
});

export const fetchHoldingOverviewFail = (errorMsg) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW_FAIL,
  payload: errorMsg
});

export const fetchHoldingOverviewSuccess = (holdingOverview) => ({
  type: PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW_SUCCESS,
  payload: holdingOverview
});
