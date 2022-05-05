import { createSelector } from "reselect";

const selectSummaryStore = (state) => state.summary;

export const selectTopCoins = createSelector([selectSummaryStore], (s) => s.topCoins);

export const selectGainersLosers = createSelector([selectSummaryStore], (s) => s.gainersLosers);

export const selectNewsSummary = createSelector([selectSummaryStore], (s) => s.news);

export const selectGlobalSummary = createSelector([selectSummaryStore], (s) => s.global);

export const selectNumLoadingReq = createSelector([selectSummaryStore], (s) => s.numLoadingReq);

export const selectIsLoadingSummary = createSelector([selectNumLoadingReq], (numLoadingReq) => numLoadingReq > 0);

export const selectIsLoadingGlobal = createSelector([selectSummaryStore], (s) => s.isLoadingGlobal);
