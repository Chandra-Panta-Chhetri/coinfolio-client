import { createSelector } from "reselect";

const selectMarketStore = (state) => state.market;

export const selectMarkets = createSelector([selectMarketStore], (market) => market.markets);

export const selectIsFetchingMarkets = createSelector([selectMarketStore], (market) => market.isLoadingMarkets);

export const selectIsFetchingMoreMarkets = createSelector([selectMarketStore], (market) => market.isLoadingMoreMarkets);

export const selectMarketsPerPage = createSelector([selectMarketStore], (market) => market.perPage);

export const selectHasMoreMarkets = createSelector([selectMarketStore], (market) => market.hasMoreMarkets);

export const selectCurrentPage = createSelector([selectMarketStore], (market) => market.pageNum);

export const selectMarketFilters = createSelector([selectMarketStore], (market) => market.filters);

export const selectSortByFilter = createSelector([selectMarketFilters], (filters) => filters.sortBy);

export const selectSortOrderFilter = createSelector([selectMarketFilters], (filters) => filters.sortOrder);

export const selectShowOnlyFilter = createSelector([selectMarketFilters], (filters) => filters.showOnly);
