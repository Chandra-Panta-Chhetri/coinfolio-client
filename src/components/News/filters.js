const NEWS_FILTERS = {
  NUM_SKELETON_LOADERS: 6,
  SHOW_ONLY: {
    OPTIONS: [
      {
        label: "Important",
        value: "important"
      },
      {
        label: "Rising",
        value: "rising"
      },
      {
        label: "Hot",
        value: "hot"
      }
    ],
    get DEFAULT_OPTION_INDEX() {
      return 2;
    },
    get DEFAULT_OPTION() {
      return this.OPTIONS[this.DEFAULT_OPTION_INDEX];
    }
  }
};

export default NEWS_FILTERS;
