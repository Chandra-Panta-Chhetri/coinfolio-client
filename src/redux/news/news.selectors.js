import { createSelector } from "reselect";

const selectNews = (state) => state.news;

export const selectNewsData = createSelector([selectNews], (news) => news.news);

export const selectEvents = createSelector([selectNews], (news) => news.events);

export const selectNumLoadingReq = createSelector(
  [selectNews],
  (news) => news.numLoadingReq
);

export const selectIsLoadingNewsData = createSelector(
  [selectNumLoadingReq],
  (numLoadingReq) => numLoadingReq > 0
);

export const selectEventFilters = createSelector(
  [selectNews],
  (news) => news.eventFilters
);
