import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  eventsFetchFail,
  eventsFetchSuccess,
  initialNewsFail,
  initialNewsSuccess,
  moreNewsFail,
  moreNewsSuccess,
  noMoreNews
} from "./discover.actions";
import DISCOVER_ACTION_TYPES from "./discover.action.types";
import { selectEventFilters, selectNewsPage, selectNews } from "./discover.selectors";
import { EVENTS_CONSTANTS } from "../../constants";
import { delayJS } from "../../utils";
import { newsAPI } from "../../api";

function* fetchNews({ payload: { filter } }) {
  try {
    const response = yield newsAPI.fetchNews({ filter });
    const news = yield response.results;
    yield put(initialNewsSuccess(news));
  } catch (err) {
    yield put(initialNewsFail("There was an error while fetching the news"));
  }
}

function* fetchMoreNews({ payload: { filter } }) {
  try {
    const page = yield select(selectNewsPage);
    const res = yield newsAPI.fetchNews({ filter, page });
    const news = yield res.results;
    const currentNews = yield select(selectNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news.length === 0 || combinedNews.length > res.totalResults) {
      return yield put(noMoreNews());
    }
    yield put(moreNewsSuccess(combinedNews));
  } catch (err) {
    yield put(moreNewsFail("There was an error while fetching more news"));
  }
}

function* getEvents() {
  try {
    const filters = yield select(selectEventFilters);
    const showOnly = yield EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value;
    const events = yield [];
    if (showOnly === "trending") {
      yield events.push(
        ...[
          {
            id: 1,
            title: "Listing on Coinbase - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 2 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 3 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 4 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 5 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 6 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            id: 7,
            title: "Listing on Coinbase 7 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            id: 8,
            title: "Listing on Coinbase 8 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            id: 9,
            title: "Listing on Coinbase 9 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            id: 10,
            title: "Listing on Coinbase 10 - Trending",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
        ]
      );
    } else if (showOnly === "significant") {
      yield events.push(
        ...[
          {
            id: 1,
            title: "Listing on Coinbase - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 2 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 3 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 4 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 5 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            title: "Listing on Coinbase 6 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            id: 7,
            title: "Listing on Coinbase 7 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            id: 8,
            title: "Listing on Coinbase 8 - Significant",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
        ]
      );
    } else if (showOnly === "hot") {
      yield events.push(
        ...[
          {
            id: 1,
            title: "Listing on Coinbase - Hot",
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
            description: "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
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
        ]
      );
    }
    yield delayJS(5000);
    yield put(eventsFetchSuccess(events));
  } catch (err) {
    yield put(eventsFetchFail("There was an error while fetching the events"));
  }
}

function* watchInitialNewsFetch() {
  yield takeLatest(DISCOVER_ACTION_TYPES.INITIAL_NEWS_FETCH, fetchNews);
}

function* watchMoreNewsFetch() {
  yield takeLatest(DISCOVER_ACTION_TYPES.FETCH_MORE_NEWS, fetchMoreNews);
}

function* watchEventsFetchStart() {
  yield takeLatest(DISCOVER_ACTION_TYPES.START_EVENTS_FETCH, getEvents);
}

export default function* discoverSagas() {
  yield all([call(watchEventsFetchStart), call(watchInitialNewsFetch), call(watchMoreNewsFetch)]);
}
