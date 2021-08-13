import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

const INITIAL_STATE = {
  portfolio: {
    value: 20000,
    percent: 14.08,
    plChange: 1000
  },
  transactions: [],
  numLoadingReq: 0,
  assets: [
    {
      iconSrc: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      fullName: "Bitcoin",
      ticker: "BTC",
      currentPrice: 39923.17,
      pricePercentChange: 3.76,
      holdingsVal: 39923.17,
      totalHoldings: 1
    },
    {
      iconSrc: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      fullName: "Ethereum",
      ticker: "ETH",
      currentPrice: 2500.24,
      pricePercentChange: -5.23,
      holdingsVal: 5000.48,
      totalHoldings: 2
    }
  ],
  overallProfit: {
    value: 8000,
    percentChange: 14
  }
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_FETCH:
    case PORTFOLIO_ACTION_TYPES.START_ADDING_NEW_TRANSACTION:
    case PORTFOLIO_ACTION_TYPES.START_DELETING_TRANSACTION_BY_ID:
    case PORTFOLIO_ACTION_TYPES.START_UPDATING_TRANSACTION_BY_ID:
    case PORTFOLIO_ACTION_TYPES.START_REMOVING_ALL_TRANSACTIONS_FOR_ASSET:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq + 1
      };
    case PORTFOLIO_ACTION_TYPES.START_TRANSACTIONS_FOR_ASSET_FETCH:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq + 1,
        transactions: []
      };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_FETCH_FAIL:
    case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL:
    case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_FAIL:
    case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_FAIL:
    case PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_FAIL:
    case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_FAIL:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_FETCH_SUCCESS:
      return {
        ...prevState,
        portfolio: action.payload.portfolio,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_SUCCESS:
      return {
        ...prevState,
        transactions: [
          ...prevState.transactions,
          action.payload.newTransaction
        ],
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_SUCCESS:
    case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_SUCCESS:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq - 1,
        transactions: action.payload.updatedTransactions
      };
    case PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_SUCCESS:
      return {
        ...prevState,
        transactions: [],
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_SUCCESS:
      return {
        ...prevState,
        transactions: action.payload.transactions,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    default:
      return prevState;
  }
};

export default userReducer;
