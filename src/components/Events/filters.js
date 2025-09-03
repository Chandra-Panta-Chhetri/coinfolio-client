const EVENTS_FILTERS = {
  TYPES: [
    {
      label: "Trending",
      value: "trending_events"
    },
    {
      label: "Significant",
      value: "significant_events"
    },
    {
      label: "Hot",
      value: "hot_events"
    }
  ],
  NUM_SKELETON_LOADERS: 6,
  get DEFAULT_DISCOVER_FILTERS() {
    return {
      dateRange: {
        start: null,
        end: null
      },
      showOnly: 0,
      limit: 12
    };
  },
  get DEFAULT_ASSET_FILTERS() {
    return {
      dateRange: {
        start: null,
        end: null
      },
      sortBy: 0,
      limit: 12
    };
  }
};

export default EVENTS_FILTERS;
