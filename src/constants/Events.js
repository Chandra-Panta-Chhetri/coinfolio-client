export default {
  SHOW_ONLY_FILTERS: [
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
  NUM_TO_SHOW: 6,
  get DEFAULT_FILTERS() {
    return {
      dateRange: {
        start: null,
        end: null
      },
      showOnly: 0,
      limit: 12
    };
  }
};
