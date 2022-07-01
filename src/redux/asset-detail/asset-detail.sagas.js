import { takeLatest, put, call, all, select } from "redux-saga/effects";
import ASSET_DETAIL_ACTION_TYPES from "./asset-detail.action.types";
import {
  selectAssetEventFilters,
  selectAssetNewsPage,
  selectAssetEventsPage,
  selectAssetEvents,
  selectAssetNews
} from "./asset-detail.selectors";
import {
  initialAssetEventsFail,
  moreAssetEventsSuccess,
  initialAssetEventsSuccess,
  moreAssetEventsFail,
  assetAboutFail,
  assetMarketsFail,
  assetOverviewFail,
  moreAssetNewsFail,
  initialAssetNewsFail,
  assetAboutSuccess,
  assetMarketsSuccess,
  assetOverviewSuccess,
  moreAssetNewsSuccess,
  initialAssetNewsSuccess,
  noMoreAssetNews,
  noMoreAssetEvents
} from "./asset-detail.actions";
import { newsAPI, eventsAPI } from "../../api";
import { EVENTS_CONSTANTS } from "../../constants";
import { toISOSubstring, delayJS } from "../../utils";

import dummydata from "../portfolio/dummydata.json";
const values = dummydata.data.prices;
const historicValue = [
  {
    label: "1h",
    data: values.hour
  },
  {
    label: "1d",
    data: values.day
  },
  {
    label: "1m",
    data: values.month
  },
  {
    label: "1y",
    data: values.year
  },
  {
    label: "All",
    data: values.all
  }
];

function* getAssetOverview({}) {
  try {
    const overview = {
      priceUsd: "20,600.11",
      rank: 1,
      name: "Bitcoin",
      statistics: [
        {
          data: [
            { label: "Market Cap", value: "$300 Bn" },
            { label: "Volume 24h", value: "$30 Bn" },
            { label: "Max Supply", value: "21.00 M" }
          ]
        },
        {
          data: [
            { label: "Total Supply", value: "19.07 M" },
            { label: "Dominance", value: "40%" },
            { label: "All Time High", value: "$25,323.23" }
          ]
        }
      ],
      historicValue
    };
    yield delayJS(4000);
    yield put(assetOverviewSuccess(overview));
  } catch (err) {
    yield put(assetOverviewFail("Server error while fetching the overview"));
  }
}

function* getAssetMarkets({}) {
  try {
    const markets = [
      { name: "Binance", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Newton", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Crypto.com", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Coinbase", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "AscendEx", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Kucoin", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "ByBit", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Crypto.com", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Coinbase", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "AscendEx", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Kucoin", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "ByBit", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Crypto.com", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Coinbase", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "AscendEx", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "Kucoin", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
      { name: "ByBit", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" }
    ];
    yield delayJS(5000);
    yield put(assetMarketsSuccess(markets));
  } catch (err) {
    yield put(assetMarketsFail("Server error while fetching the markets"));
  }
}

function* getAssetAbout({}) {
  try {
    console.log("here in asset about");
    const about = {
      links: [
        {
          label: "Website",
          value: "https://www.ethereum.org"
        },
        {
          label: "Source Code",
          value: "https://www.ethereum.org"
        },
        {
          label: "Block Explorer",
          value: "https://www.ethereum.org"
        },
        {
          label: "Reddit",
          value: "https://www.ethereum.org"
        },
        {
          label: "Facebook",
          value: "https://www.ethereum.org"
        },
        {
          label: "Twitter",
          value: "https://www.ethereum.org"
        }
      ],
      description:
        "Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes token, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more."
    };
    yield delayJS(5000);
    yield put(assetAboutSuccess(about));
  } catch (err) {
    yield put(assetAboutFail("Server error while fetching the about"));
  }
}

function* getNews({ payload: { filter } }) {
  try {
    const response = yield newsAPI.getNews({ filter });
    const news = yield response.results;
    if (news.length === 0) {
      return yield put(noMoreAssetNews());
    }
    yield put(initialAssetNewsSuccess(news));
  } catch (err) {
    yield put(initialAssetNewsFail("There was an error while fetching the news"));
  }
}

function* getMoreNews({ payload: { filter } }) {
  try {
    const page = yield select(selectAssetNewsPage);
    const res = yield newsAPI.getNews({ filter, page });
    const news = yield res.results;
    const currentNews = yield select(selectAssetNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news.length === 0 || combinedNews.length >= res.totalResults) {
      return yield put(noMoreAssetNews());
    }
    yield put(moreAssetNewsSuccess(combinedNews));
  } catch (err) {
    yield put(moreAssetNewsFail("There was an error while fetching more news"));
  }
}

function* getEvents() {
  try {
    const filters = yield select(selectAssetEventFilters);
    const filtersDTO = {
      max: filters.limit,
      showOnly: EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value,
      ...(filters.dateRange.start && { dateRangeStart: toISOSubstring(filters.dateRange.start) }),
      ...(filters.dateRange.end && { dateRangeEnd: toISOSubstring(filters.dateRange.end) })
    };
    const res = yield eventsAPI.getEvents(filtersDTO);
    const events = yield res.results;
    if (events.length === 0) {
      return yield put(noMoreAssetEvents());
    }
    yield put(initialAssetEventsSuccess(events));
  } catch (err) {
    yield put(initialAssetEventsFail("There was an error while fetching the events"));
  }
}

function* getMoreEvents() {
  try {
    const page = yield select(selectAssetEventsPage);
    const filters = yield select(selectAssetEventFilters);
    const filtersDTO = {
      max: filters.limit,
      showOnly: EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value,
      page,
      ...(filters.dateRange.start && { dateRangeStart: toISOSubstring(filters.dateRange.start) }),
      ...(filters.dateRange.end && { dateRangeEnd: toISOSubstring(filters.dateRange.end) })
    };
    const res = yield eventsAPI.getEvents(filtersDTO);
    const events = yield res.results;
    const currentEvents = yield select(selectAssetEvents);
    const combinedEvents = yield [...currentEvents, ...events];
    if (events.length === 0 || combinedEvents.length >= res.metadata.total_count) {
      return yield put(noMoreAssetEvents());
    }
    yield put(moreAssetEventsSuccess(combinedEvents));
  } catch (err) {
    console.log(err.message);
    yield put(moreAssetEventsFail("There was an error while fetching more events"));
  }
}

function* watchInitialNewsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_NEWS_FETCH, getNews);
}

function* watchMoreNewsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_NEWS, getMoreNews);
}

function* watchInitialEventsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.INITIAL_ASSET_EVENTS_FETCH, getEvents);
}

function* watchMoreEventsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_MORE_ASSET_EVENTS, getMoreEvents);
}

function* watchOverviewFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_OVERVIEW, getAssetOverview);
}

function* watchMarketsFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_MARKETS, getAssetMarkets);
}

function* watchAboutFetch() {
  yield takeLatest(ASSET_DETAIL_ACTION_TYPES.FETCH_ASSET_ABOUT, getAssetAbout);
}

export default function* discoverSagas() {
  yield all([
    call(watchInitialEventsFetch),
    call(watchInitialNewsFetch),
    call(watchMoreNewsFetch),
    call(watchMoreEventsFetch),
    call(watchOverviewFetch),
    call(watchMarketsFetch),
    call(watchAboutFetch)
  ]);
}
