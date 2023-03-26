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
  isLoadingHoldingOverview: false
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PORTFOLIO_ACTION_TYPES.START_USER_PORTFOLIOS_FETCH:
      return {
        ...prevState,
        isLoadingUserPortfolios: true
      };
    case PORTFOLIO_ACTION_TYPES.USER_PORTFOLIOS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingUserPortfolios: false
      };
    case PORTFOLIO_ACTION_TYPES.USER_PORTFOLIOS_FETCH_SUCCESS:
      return {
        ...prevState,
        isLoadingUserPortfolios: false,
        userPortfolios: action.payload
      };
    case PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_OVERVIEW_FETCH:
      return {
        ...prevState,
        isLoadingOverview: true
      };
    case PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_PORTFOLIO:
    case PORTFOLIO_ACTION_TYPES.START_UPDATING_PORTFOLIO:
    case PORTFOLIO_ACTION_TYPES.START_DELETING_PORTFOLIO:
      return {
        ...prevState,
        isUpdatingUserPortfolios: true
      };
    case PORTFOLIO_ACTION_TYPES.ADDING_NEW_PORTFOLIO_FAIL:
    case PORTFOLIO_ACTION_TYPES.UPDATING_PORTFOLIO_FAIL:
    case PORTFOLIO_ACTION_TYPES.DELETING_PORTFOLIO_FAIL:
      return {
        ...prevState,
        isUpdatingUserPortfolios: false
      };
    case PORTFOLIO_ACTION_TYPES.ADDING_NEW_PORTFOLIO_SUCCESS:
    case PORTFOLIO_ACTION_TYPES.UPDATING_PORTFOLIO_SUCCESS:
    case PORTFOLIO_ACTION_TYPES.DELETING_PORTFOLIO_SUCCESS:
      return {
        ...prevState,
        isUpdatingUserPortfolios: false,
        userPortfolios: action.payload
      };
    case PORTFOLIO_ACTION_TYPES.CHANGE_ACTIVE_PORTFOLIO:
      return {
        ...prevState,
        activePortfolio: action.payload
      };
    case PORTFOLIO_ACTION_TYPES.START_TRANSACTION_COINS_FETCH:
      return {
        ...prevState,
        isLoadingTransactionCoins: true
      };
    case PORTFOLIO_ACTION_TYPES.TRANSACTION_COINS_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingTransactionCoins: false
      };
    case PORTFOLIO_ACTION_TYPES.TRANSACTION_COINS_FETCH_SUCCESS:
      return {
        ...prevState,
        isLoadingTransactionCoins: false,
        transactionCoins: action.payload
      };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingOverview: false
      };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isLoadingOverview: false
      };
    case PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION:
      return {
        ...prevState,
        isAddingTransaction: true
      };
    case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL:
      return {
        ...prevState,
        isAddingTransaction: false
      };
    case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_SUCCESS:
      return {
        ...prevState,
        isAddingTransaction: false,
        transactions: action.payload
      };
    case PORTFOLIO_ACTION_TYPES.START_DELETING_HOLDING:
      return {
        ...prevState,
        isDeletingHolding: true
      };
    case PORTFOLIO_ACTION_TYPES.DELETING_HOLDING_FAIL:
      return {
        ...prevState,
        isDeletingHolding: false
      };
    case PORTFOLIO_ACTION_TYPES.DELETING_HOLDING_SUCCESS:
      return {
        ...prevState,
        isDeletingHolding: false,
        transactions: []
      };
    case PORTFOLIO_ACTION_TYPES.START_HOLDING_OVERVIEW_FETCH:
      return {
        ...prevState,
        isLoadingHoldingOverview: true
      };
    case PORTFOLIO_ACTION_TYPES.HOLDING_OVERVIEW_FETCH_FAIL:
      return {
        ...prevState,
        isLoadingHoldingOverview: false
      };
    case PORTFOLIO_ACTION_TYPES.HOLDING_OVERVIEW_FETCH_SUCCESS:
      return {
        ...prevState,
        isLoadingHoldingOverview: false,
        transactions: action.payload.transactions,
        holdingOverview: action.payload.summary
      };
    default:
      return prevState;
  }
};

export default userReducer;
