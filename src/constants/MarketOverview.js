const SORT_BY = {
  FILTERS: [
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
  get DEFAULT_FILTER() {
    return this.FILTERS[0];
  }
};

const SORT_ORDER = {
  FILTERS: [
    {
      label: "Asc",
      value: "ASC"
    },
    { label: "Desc", value: "DESC" }
  ],
  get DEFAULT_FILTER() {
    return this.FILTERS[0];
  }
};

const SHOW_ONLY = {
  FILTERS: [
    { label: "All", value: "all" },
    { label: "Favorites", value: "favorites" }
  ],
  get DEFAULT_FILTER() {
    return this.FILTERS[0];
  }
};

const NUM_SEARCH_RESULT_SKELETONS = 4;

export default {
  SORT_BY,
  SORT_ORDER,
  SHOW_ONLY,
  NUM_SEARCH_RESULT_SKELETONS
};
