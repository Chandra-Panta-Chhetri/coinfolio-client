const LATEST_NEWS_CONSTANTS = {
  FILTERS: [
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
  DEFAULT_FILTER_INDEX: 2,
  NUM_TO_SHOW: 8
};

const DEFAULT_FILTER = LATEST_NEWS_CONSTANTS.FILTERS[LATEST_NEWS_CONSTANTS.DEFAULT_FILTER_INDEX].value;

export default {
  ...LATEST_NEWS_CONSTANTS,
  DEFAULT_FILTER
};
