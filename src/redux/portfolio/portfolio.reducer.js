import PORTFOLIO_ACTION_TYPES from "./portfolio.action.types";

const INITIAL_STATE = {
  totalValue: "41500.54",
  totalProfitLoss: {
    value: "1200.54",
    percentChange: "0.02979007444"
  },
  totalCost: "40300",
  pieCharts: [
    {
      coinId: "bitcoin",
      percent: "0.93974680811",
      coinSymbol: "BTC",
      coinName: "Bitcoin",
      totalValue: "39000"
    },
    {
      coinId: "ethereum",
      percent: "0.06025319188",
      coinSymbol: "ETH",
      coinName: "Ethereum",
      totalValue: "2500.54"
    }
  ],
  transactions: [],
  holdings: [
    {
      totalCost: "38000",
      coinId: "bitcoin",
      amount: "1",
      priceUSD: {
        value: "39000",
        percentChange: "1.6508409229657066"
      },
      profitLoss: {
        value: "1000",
        percentChange: "2.63157894737"
      },
      totalValue: "39000",
      avgCost: "38000",
      coinSymbol: "BTC",
      coinName: "Bitcoin",
      coinURL: "https://assets.coincap.io/assets/icons/btc@2x.png"
    },
    {
      totalCost: "2300",
      coinId: "ethereum",
      amount: "1",
      priceUSD: {
        value: "2500.54",
        percentChange: "1.6508409229657066"
      },
      profitLoss: {
        value: "200.54",
        percentChange: "8.71913043478"
      },
      totalValue: "2500.54",
      avgCost: "2300",
      coinSymbol: "ETH",
      coinName: "Ethereum",
      coinURL: "https://assets.coincap.io/assets/icons/eth@2x.png"
    }
  ],
  isLoading: false
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PORTFOLIO_ACTION_TYPES.START_PORTFOLIO_FETCH:
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
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_FETCH_FAIL:
      // case PORTFOLIO_ACTION_TYPES.ADDING_NEW_TRANSACTION_FAIL:
      // case PORTFOLIO_ACTION_TYPES.DELETE_TRANSACTION_BY_ID_FAIL:
      // case PORTFOLIO_ACTION_TYPES.UPDATE_TRANSACTION_BY_ID_FAIL:
      // case PORTFOLIO_ACTION_TYPES.REMOVE_ALL_TRANSACTIONS_FOR_ASSET_FAIL:
      // case PORTFOLIO_ACTION_TYPES.FETCH_TRANSACTIONS_FOR_ASSET_FAIL:
      return {
        ...prevState,
        isLoading: false
      };
    case PORTFOLIO_ACTION_TYPES.PORTFOLIO_FETCH_SUCCESS:
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
