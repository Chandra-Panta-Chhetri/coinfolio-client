import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

const INITIAL_STATE = {
  totalValue: 0,
  totalProfitLoss: null,
  totalCost: "",
  pieCharts: [],
  transactions: [],
  holdings: [],
  isLoadingOverview: true,
  userPortfolios: [],
  isLoadingUserPortfolios: true,
  isUpdatingUserPortfolios: false,
  activePortfolio: null,
  isLoadingTransactionCoins: true,
  transactionCoins: [],
  isAddingTransaction: false,
  isDeletingHolding: false,
  holdingOverview: null,
  isLoadingHoldingOverview: false,
  isDeletingTransaction: false,
  isUpdatingTransaction: false
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS:
      return {
        ...prevState,
        isLoadingUserPortfolios: true
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS_FAIL:
      return {
        ...prevState,
        isLoadingUserPortfolios: false
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_USER_PORTFOLIOS_SUCCESS:
      return {
        ...prevState,
        isLoadingUserPortfolios: false,
        userPortfolios: action?.payload
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW:
      return {
        ...prevState,
        isLoadingOverview: true
      };
    case PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO:
    case PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO:
    case PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO:
      return {
        ...prevState,
        isUpdatingUserPortfolios: true
      };
    case PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO_FAIL:
    case PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO_FAIL:
    case PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO_FAIL:
      return {
        ...prevState,
        isUpdatingUserPortfolios: false
      };
    case PORTFOLIO_ACTION_TYPES.ADD_NEW_PORTFOLIO_SUCCESS:
    case PORTFOLIO_ACTION_TYPES.UPDATE_PORTFOLIO_SUCCESS:
    case PORTFOLIO_ACTION_TYPES.DELETE_PORTFOLIO_SUCCESS:
      return {
        ...prevState,
        isUpdatingUserPortfolios: false,
        userPortfolios: action?.payload
      };
    case PORTFOLIO_ACTION_TYPES.CHANGE_ACTIVE_PORTFOLIO:
      return {
        ...prevState,
        activePortfolio: action?.payload
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS:
      return {
        ...prevState,
        isLoadingTransactionCoins: true
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS_FAIL:
      return {
        ...prevState,
        isLoadingTransactionCoins: false
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTION_COINS_SUCCESS:
      return {
        ...prevState,
        isLoadingTransactionCoins: false,
        transactionCoins: action?.payload
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW_FAIL:
      return {
        ...prevState,
        isLoadingOverview: false
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_PORTFOLIO_OVERVIEW_SUCCESS:
      return {
        ...prevState,
        ...action?.payload,
        isLoadingOverview: false
      };
    case PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION:
      return {
        ...prevState,
        isAddingTransaction: true
      };
    case PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION_FAIL:
      return {
        ...prevState,
        isAddingTransaction: false
      };
    case PORTFOLIO_ACTION_TYPES.ADD_NEW_TRANSACTION_SUCCESS:
      return {
        ...prevState,
        isAddingTransaction: false,
        transactions: action?.payload
      };
    case PORTFOLIO_ACTION_TYPES.DELETE_HOLDING:
      return {
        ...prevState,
        isDeletingHolding: true
      };
    case PORTFOLIO_ACTION_TYPES.DELETE_HOLDING_FAIL:
      return {
        ...prevState,
        isDeletingHolding: false
      };
    case PORTFOLIO_ACTION_TYPES.DELETE_HOLDING_SUCCESS:
      return {
        ...prevState,
        isDeletingHolding: false,
        transactions: []
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW:
      return {
        ...prevState,
        isLoadingHoldingOverview: true
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW_FAIL:
      return {
        ...prevState,
        isLoadingHoldingOverview: false
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_HOLDING_OVERVIEW_SUCCESS:
      return {
        ...prevState,
        isLoadingHoldingOverview: false,
        transactions: action?.payload?.transactions,
        holdingOverview: action?.payload?.summary
      };
    case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION:
      return {
        ...prevState,
        isDeletingTransaction: true
      };
    case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_FAIL:
      return {
        ...prevState,
        isDeletingTransaction: false
      };
    case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_SUCCESS:
      return {
        ...prevState,
        isDeletingTransaction: true
      };
    case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION:
      return {
        ...prevState,
        isUpdatingTransaction: true
      };
    case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_FAIL:
      return {
        ...prevState,
        isUpdatingTransaction: false
      };
    case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_SUCCESS:
      return {
        ...prevState,
        isUpdatingTransaction: false
      };
    default:
      return prevState;
  }
};

export default userReducer;
