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
    return this.FILTERS[0].value;
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
    return this.FILTERS[0].value;
  }
};

export default {
  LIMIT,
  SORT_BY
};
