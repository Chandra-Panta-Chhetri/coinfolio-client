import SUMMARY_ACTION_TYPES from "./summary.action.types";

const INITIAL_STATE = {
  topCoins: [
    {
      ticker: "BTC",
      price: 69230.24,
      percentChange: -4.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
    },
    {
      ticker: "LTC",
      price: 400,
      percentChange: +7.0,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
    },
    {
      ticker: "ETH",
      price: 4800.24,
      percentChange: -2.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    },
    {
      ticker: "BNB",
      price: 800.24,
      percentChange: -10.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
    },
    {
      ticker: "USDT",
      price: 1,
      percentChange: 3.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
    }
  ],
  gainersLosers: [
    {
      fullName: "Bitcoin",
      ticker: "BTC",
      price: 69230.24,
      percentChange: 4.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
    },
    {
      fullName: "Ethereum",
      ticker: "ETH",
      price: 4800.24,
      percentChange: -2.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    },
    {
      fullName: "Litecoin",
      ticker: "LTC",
      price: 400,
      percentChange: 7,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
    },
    {
      fullName: "Binance Coin",
      ticker: "BNB",
      price: 800.24,
      percentChange: -10.25,
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
    }
  ],
  news: [
    {
      title:
        "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face",
      publishedTime: "3h ago",
      source: "CBC News",
      imagePreview: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
    },
    {
      title: "Ethereum’s Ratio Overtakes Resistance",
      publishedTime: "10h ago",
      source: "Trustnodes",
      imagePreview:
        "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
    },
    {
      title: "Will Musk Buy ETH?",
      publishedTime: "1h ago",
      source: "Trustnodes",
      imagePreview:
        "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
    }
  ],
  global: {
    marketCap: 3026234553628,
    "24hVolume": 286423453955,
    btcDominance: 42.4,
    ethDominance: 19.4
  },
  numLoadingReq: 0
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUMMARY_ACTION_TYPES.START_GLOBAL_SUMMARY_FETCH:
    case SUMMARY_ACTION_TYPES.START_TOP_COINS_FETCH:
    case SUMMARY_ACTION_TYPES.START_GAINERS_LOSERS_FETCH:
    case SUMMARY_ACTION_TYPES.START_NEWS_SUMMARY_FETCH:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq + 1
      };
    case SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_FAIL:
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH_FAIL:
    case SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_FAIL:
    case SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_FAIL:
      return {
        ...prevState,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.TOP_COINS_FETCH_SUCCESS:
      return {
        ...prevState,
        topCoins: action.payload.topCoins,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.GLOBAL_SUMMARY_FETCH_SUCCESS:
      return {
        ...prevState,
        global: action.payload.globalSummary,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.NEWS_SUMMARY_FETCH_SUCCESS:
      return {
        ...prevState,
        news: action.payload.news,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    case SUMMARY_ACTION_TYPES.GAINERS_LOSERS_FETCH_SUCCESS:
      return {
        ...prevState,
        gainersLosers: action.payload.gainersLosers,
        numLoadingReq: prevState.numLoadingReq - 1
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
