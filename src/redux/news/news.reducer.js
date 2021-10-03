import NEWS_ACTION_TYPES from "./news.action.types";
import CONSTANTS from "../../Constants";

const INITIAL_STATE = {
  numLoadingReq: 2,
  news: [],
  events: [
    {
      id: 1,
      title: "Listing on Coinbase - Hot",
      description:
        "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
      verified: true,
      canOccurBefore: true,
      date: "2018-11-30T00:00:00+01:00",
      coins: [
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        }
      ],
      type: {
        label: "Listing",
        backgroundColor: "purple"
      }
    },
    {
      id: 2,
      title: "Listing on Coinbase 2 - Hot",
      description:
        "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
      verified: true,
      canOccurBefore: true,
      date: "2018-11-30T00:00:00+01:00",
      coins: [
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        },
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        }
      ],
      type: {
        label: "Tokenomics",
        backgroundColor: "red"
      }
    },
    {
      id: 3,
      title: "Listing on Coinbase 3 - Hot",
      description:
        "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
      verified: true,
      canOccurBefore: true,
      date: "2018-11-30T00:00:00+01:00",
      coins: [
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        }
      ],
      type: {
        label: "AMA",
        backgroundColor: "blue"
      }
    },
    {
      id: 4,
      title: "Listing on Coinbase 4 - Hot",
      description:
        "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
      verified: true,
      canOccurBefore: true,
      date: "2018-11-30T00:00:00+01:00",
      coins: [
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        }
      ],
      type: {
        label: "Tokenomics",
        backgroundColor: "red"
      }
    },
    {
      id: 5,
      title: "Listing on Coinbase 5 - Hot",
      description:
        "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
      verified: true,
      canOccurBefore: true,
      date: "2018-11-30T00:00:00+01:00",
      coins: [
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        }
      ],
      type: {
        label: "Tokenomics",
        backgroundColor: "red"
      }
    },
    {
      id: 6,
      title: "Listing on Coinbase 6 - Hot",
      description:
        "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
      verified: true,
      canOccurBefore: true,
      date: "2018-11-30T00:00:00+01:00",
      coins: [
        {
          fullName: "Bitcoin (BTC)",
          imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
        }
      ],
      type: {
        label: "Tokenomics",
        backgroundColor: "red"
      }
    }
  ],
  eventFilters: {
    dateRange: null,
    showOnly: CONSTANTS.LATEST_EVENTS.DEFAULT_SHOW_ONLY_FILTER_INDEX,
    limit: CONSTANTS.LATEST_EVENTS.NUM_EVENTS_TO_SHOW
  }
};

const newsReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWS_ACTION_TYPES.START_NEWS_FETCH:
      return {
        ...prevState,
        news: [],
        numLoadingReq: prevState.numLoadingReq + 1
      };
    case NEWS_ACTION_TYPES.START_EVENTS_FETCH:
      return {
        ...prevState,
        events: [],
        numLoadingReq: prevState.numLoadingReq + 1
      };
    case NEWS_ACTION_TYPES.NEWS_FETCH_SUCCESS:
      return {
        ...prevState,
        news: action.payload.data,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case NEWS_ACTION_TYPES.EVENTS_FETCH_SUCCESS:
      return {
        ...prevState,
        events: action.payload.data,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case NEWS_ACTION_TYPES.NEWS_FETCH_FAIL:
    case NEWS_ACTION_TYPES.EVENTS_FETCH_FAIL:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case NEWS_ACTION_TYPES.UPDATE_EVENT_FILTERS:
      return {
        ...prevState,
        eventFilters: {
          ...prevState.eventFilters,
          ...action.payload
        }
      };
    default:
      return prevState;
  }
};

export default newsReducer;
