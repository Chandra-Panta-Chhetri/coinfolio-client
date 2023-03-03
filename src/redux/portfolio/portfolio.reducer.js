import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

const INITIAL_STATE = {
  totalValue: 0,
  totalProfitLoss: null,
  totalCost: "",
  pieCharts: [],
  transactions: [],
  holdings: [],
  isLoading: true,
  userPortfolios: [],
  isLoadingUserPortfolios: true
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
      // case PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION:
      // case PORTFOLIO_ACTION_TYPES.START_DELETING_TRANSACTION_BY_ID:
      // case PORTFOLIO_ACTION_TYPES.START_UPDATING_TRANSACTION_BY_ID:
      // case PORTFOLIO_ACTION_TYPES.START_REMOVING_ALL_TRANSACTIONS_FOR_ASSET:
      return {
        ...prevState,
        isLoading: true
      };
    // case PORTFOLIO_ACTION_TYPES.START_TRANSACTIONS_FOR_ASSET_FETCH:
    //   return {
    //     ...prevState,
    //     isLoading: true,
    //     transactions: []
    //   };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_FAIL:
      // case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL:
      // case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_FAIL:
      // case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_FAIL:
      // case PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_FAIL:
      // case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_FAIL:
      return {
        ...prevState,
        isLoading: false
      };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_OVERVIEW_FETCH_SUCCESS:
      return {
        ...prevState,
        ...action.payload,
        isLoading: false
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
