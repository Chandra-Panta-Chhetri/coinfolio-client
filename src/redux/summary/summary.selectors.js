import { createSelector } from "reselect";

const selectSummary = (state) => state.summary;

export const selectTopCoins = createSelector(
  [selectSummary],
  (summary) => summary.topCoins
);

export const selectGainersLosers = createSelector(
  [selectSummary],
  (summary) => summary.gainersLosers
);

export const selectNewsSummary = createSelector(
  [selectSummary],
  (summary) => summary.news
);

export const selectGlobalSummary = createSelector(
  [selectSummary],
  (summary) => summary.global
);

export const selectNumLoadingReq = createSelector(
  [selectSummary],
  (summary) => summary.numLoadingReq
);

export const selectIsLoadingSummary = createSelector(
  [selectNumLoadingReq],
  (numLoadingReq) => numLoadingReq > 0
);
