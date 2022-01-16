import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  eventsFetchFail,
  eventsFetchSuccess,
  newsFetchFail,
  newsFetchSuccess,
  nextNewsFetchFail,
  nextNewsFetchSuccess
} from "./news.actions";
import NEWS_ACTION_TYPES from "./news.action.types";
import { selectEventFilters, selectNewsPage, selectNews } from "./news.selectors";
import { LATEST_EVENTS_CONSTANTS } from "../../constants";
import { delayJS } from "../../utils";
import { newsAPI } from "../../api";

function* getNews({ payload: { filter } }) {
  try {
    const res = yield newsAPI.getNews({ filter });
    const news = yield res.results;
    yield put(newsFetchSuccess(news));
  } catch (err) {
    yield put(newsFetchFail("There was a server error while fetching the news"));
  }
}

function* getMoreNews({ payload: { filter } }) {
  try {
    const page = yield select(selectNewsPage);
    const res = yield newsAPI.getNews({ filter, page });
    const news = yield res.results;
    const currentNews = yield select(selectNews);
    const combinedNews = yield [...currentNews, ...news];
    if (news.length === 0 || combinedNews.length > res.totalResults) {
      throw Error();
    }
    yield put(nextNewsFetchSuccess(combinedNews));
  } catch (err) {
    yield put(nextNewsFetchFail("There was a server error while fetching more news"));
  }
}

function* getEvents() {
  try {
    const filters = yield select(selectEventFilters);
    const showOnly = yield LATEST_EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[filters.showOnly].value;
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
    yield put(eventsFetchFail("There was a server error while fetching the latest events"));
  }
}

function* watchNewsFetchStart() {
  yield takeLatest(NEWS_ACTION_TYPES.START_INITIAL_NEWS_FETCH, getNews);
}

function* watchMoreNewsFetch() {
  yield takeLatest(NEWS_ACTION_TYPES.FETCH_MORE_NEWS, getMoreNews);
}

function* watchEventsFetchStart() {
  yield takeLatest(NEWS_ACTION_TYPES.START_EVENTS_FETCH, getEvents);
}

export default function* newsSagas() {
  yield all([call(watchEventsFetchStart), call(watchNewsFetchStart), call(watchMoreNewsFetch)]);
}
