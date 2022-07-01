const NEWS_CONSTANTS = {
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
  NUM_TO_SHOW: 6
};

const DEFAULT_FILTER = NEWS_CONSTANTS.FILTERS[NEWS_CONSTANTS.DEFAULT_FILTER_INDEX].value;

export default {
  ...NEWS_CONSTANTS,
  DEFAULT_FILTER
};
