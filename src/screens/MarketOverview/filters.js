const MARKET_OVERVIEW_FILTERS = {
  SORT_BY: {
    OPTIONS: [
      {
        label: "Rank",
        value: "rank"
      },
      {
        label: "24h Volume",
        value: "volumeUsd24Hr"
      },
      {
        label: "Name",
        value: "name"
      },
      {
        label: "Market Cap",
        value: "marketCapUsd"
      },
      {
        label: "Percent Change",
        value: "changePercent24Hr"
      },
      {
        label: "Price",
        value: "priceUsd"
      }
    ],
    get DEFAULT_OPTION() {
      return this.OPTIONS[0];
    }
  },
  SORT_ORDER: {
    OPTIONS: [
      {
        label: "Asc",
        value: "ASC"
      },
      { label: "Desc", value: "DESC" }
    ],
    get DEFAULT_OPTION() {
      return this.OPTIONS[0];
    }
  },
  SHOW_ONLY: {
    OPTIONS: [
      { label: "All", value: "all" },
      { label: "Favorites", value: "favorites" }
    ],
    get DEFAULT_OPTION() {
      return this.OPTIONS[0];
    }
  },
  NUM_SKELETON_LOADERS: 4
};

export default MARKET_OVERVIEW_FILTERS;
