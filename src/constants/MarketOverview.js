const SORT_BY = {
  FILTERS: [
    {
      label: "Rank",
      value: "rank"
    },
    {
      label: "24h Volume",
      value: "volume"
    },
    {
      label: "Name",
      value: "name"
    },
    {
      label: "Market Cap",
      value: "mcap"
    },
    {
      label: "Percent Change",
      value: "percent"
    },
    {
      label: "Price",
      value: "price"
    }
  ],
  get DEFAULT_FILTER() {
    return this.FILTERS[0];
  }
};

const LIMIT = {
  FILTERS: [
    {
      label: "Full List",
      value: "full"
    },
    {
      label: "Top 50",
      value: "top50"
    },
    {
      label: "Top 100",
      value: "top100"
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
      value: "asc"
    },
    { label: "Desc", value: "desc" }
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

export default {
  LIMIT,
  SORT_BY,
  SORT_ORDER,
  SHOW_ONLY,
  SPARK_LINE: {
    MAX_NUM_POINTS_TO_SHOW: 30
  }
};
