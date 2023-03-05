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
  activePortfolio: null
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
    // case PORTFOLIO_ACTION_TYPES.START_TRANSACTIONS_FOR_ASSET_FETCH:
    //   return {
    //     ...prevState,
    //     isLoadingOverview: true,
    //     transactions: []
    //   };
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
    // case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_SUCCESS:
    //   return {
    //     ...prevState,
    //     transactions: [...prevState.transactions, action.payload.newTransaction],
    //     numLoadingReq: prevState.numLoadingReq - 1
    //   };
    // case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_SUCCESS:
    // case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_SUCCESS:
    //   return {
    //     ...prevState,
    //     numLoadingReq: prevState.numLoadingReq - 1,
    //     transactions: action.payload.updatedTransactions
    //   };
    // case PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_SUCCESS:
    //   return {
    //     ...prevState,
    //     transactions: [],
    //     numLoadingReq: prevState.numLoadingReq - 1
    //   };
    // case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_SUCCESS:
    //   return {
    //     ...prevState,
    //     transactions: action.payload.transactions,
    //     numLoadingReq: prevState.numLoadingReq - 1
    //   };
    default:
      return prevState;
  }
};

export default userReducer;
