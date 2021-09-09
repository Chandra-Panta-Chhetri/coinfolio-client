import NEWS_ACTION_TYPES from "./news.action.types";
import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  eventsFetchFail,
  eventsFetchSuccess,
  newsFetchFail,
  newsFetchSuccess
} from "./news.actions";

function* getNews({ payload: { limit, filter } }) {
  try {
    const news = yield [];

    switch (filter) {
      case "rising":
        yield news.push(
          ...[
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - rising",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - rising",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - rising",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 2 rising",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - 2 rising",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - 2 rising",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 3 rising",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - 3 rising",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - 3 rising",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 4 rising",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - 4 rising",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - 4 rising",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            }
          ]
        );
        break;
      case "important":
        yield news.push(
          ...[
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - important",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - important",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - important",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 2 important",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - 2 important",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - 2 important",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 3 important",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - 3 important",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - 3 important",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            }
          ]
        );
        break;
      case "hot":
        yield news.push(
          ...[
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - hot",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - hot",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - hot",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 2 hot",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            },
            {
              title: "Ethereum’s Ratio Overtakes Resistance - 2 hot",
              publishedTime: "10h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
            },
            {
              title: "Will Musk Buy ETH? - 2 hot",
              publishedTime: "1h ago",
              source: "Trustnodes",
              imagePreview:
                "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
            },
            {
              title:
                "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face - 3 hot",
              publishedTime: "3h ago",
              source: "CBC News",
              imagePreview:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            }
          ]
        );
        break;
    }
    yield put(newsFetchSuccess(news));
  } catch (err) {
    yield put(
      newsFetchFail("There was a server error while fetching the latest news")
    );
  }
}

function* getEvents({ payload: { limit, filter } }) {
  try {
    const events = yield [];
    yield put(eventsFetchSuccess(events));
  } catch (err) {
    yield put(
      eventsFetchFail(
        "There was a server error while fetching the latest events"
      )
    );
  }
}

function* watchNewsFetchStart() {
  yield takeLatest(NEWS_ACTION_TYPES.START_NEWS_FETCH, getNews);
}

function* watchEventsFetchStart() {
  yield takeLatest(NEWS_ACTION_TYPES.START_EVENTS_FETCH, getEvents);
}

export default function* newsSagas() {
  yield all([call(watchEventsFetchStart), call(watchNewsFetchStart)]);
}
