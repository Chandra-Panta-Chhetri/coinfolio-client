import { createSelector } from "reselect";

const selectSummaryStore = (state) => state.summary;

export const selectTopCoins = createSelector([selectSummaryStore], (s) => s.topCoins);

export const selectGainersLosers = createSelector([selectSummaryStore], (s) => s.gainersLosers);

export const selectNewsSummary = createSelector([selectSummaryStore], (s) => s.news);

export const selectGlobalSummary = createSelector([selectSummaryStore], (s) => s.global);

export const selectIsLoadingGlobal = createSelector([selectSummaryStore], (s) => s.isLoadingGlobal);

export const selectIsLoadingTopCoins = createSelector([selectSummaryStore], (s) => s.isLoadingTopCoins);

export const selectIsLoadingGainersLosers = createSelector([selectSummaryStore], (s) => s.isLoadingGainersLosers);

export const selectIsLoadingNewsSummary = createSelector([selectSummaryStore], (s) => s.isLoadingNewsSummary);
