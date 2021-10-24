import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  eventsFetchFail,
  eventsFetchSuccess,
  newsFetchFail,
  newsFetchSuccess
} from "./news.actions";
import NEWS_ACTION_TYPES from "./news.action.types";
import { selectEventFilters } from "./news.selectors";
import { LATEST_EVENTS_CONSTANTS } from "../../constants";
import { delayJS } from "../../utils";

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
    yield delayJS(5000);
    yield put(newsFetchSuccess(news));
  } catch (err) {
    yield put(
      newsFetchFail("There was a server error while fetching the latest news")
    );
  }
}

function* getEvents() {
  try {
    const filters = yield select(selectEventFilters);
    const showOnly = yield LATEST_EVENTS_CONSTANTS.SHOW_ONLY_FILTERS[
      filters.showOnly
    ].value;
    const events = yield [];
    if (showOnly === "trending") {
      yield events.push(
        ...[
          {
            id: 1,
            title: "Listing on Coinbase - Trending",
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
              },
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
              },
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
            description:
              "The biggest coin burn of the year...We're burning smt smt smt smt smt smt smt smt",
            verified: true,
            canOccurBefore: true,
            date: "2018-11-30T00:00:00+01:00",
            coins: [
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
              },
              {
                fullName: "Bitcoin (BTC)",
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
                imageUrl:
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
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
