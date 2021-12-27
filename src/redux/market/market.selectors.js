import { createSelector } from "reselect";

const selectMarket = (state) => state.market;

export const selectMarkets = createSelector([selectMarket], (market) => market.markets);

export const selectIsFetchingMarkets = createSelector([selectMarket], (market) => market.isFetchingMarkets);

export const selectMarketsPerPage = createSelector([selectMarket], (market) => market.perPage);

export const selectHasMoreMarkets = createSelector([selectMarket], (market) => market.hasMoreMarkets);

export const selectCurrentPage = createSelector([selectMarket], (market) => market.pageNum);

export const selectMarketFilters = createSelector([selectMarket], (market) => market.filters);

export const selectSortByFilter = createSelector([selectMarketFilters], (filters) => filters.sortBy);

export const selectLimitFilter = createSelector([selectMarketFilters], (filters) => filters.limit);

export const selectSortOrderFilter = createSelector([selectMarketFilters], (filters) => filters.sortOrder);

export const selectShowOnlyFilter = createSelector([selectMarketFilters], (filters) => filters.showOnly);
