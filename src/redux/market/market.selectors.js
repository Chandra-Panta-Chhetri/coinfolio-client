import { createSelector } from "reselect";

const selectMarketStore = (state) => state?.market;

export const selectMarkets = createSelector([selectMarketStore], (ms) => ms?.markets);

export const selectIsFetchingMarkets = createSelector([selectMarketStore], (ms) => ms?.isLoadingMarkets);

export const selectIsFetchingMoreMarkets = createSelector([selectMarketStore], (ms) => ms?.isLoadingMoreMarkets);

export const selectMarketsPerPage = createSelector([selectMarketStore], (ms) => ms?.perPage);

export const selectHasMoreMarkets = createSelector([selectMarketStore], (ms) => ms?.hasMoreMarkets);

export const selectCurrentPage = createSelector([selectMarketStore], (ms) => ms?.pageNum);

export const selectMarketFilters = createSelector([selectMarketStore], (ms) => ms?.filters);

export const selectSortByFilter = createSelector([selectMarketFilters], (filters) => filters?.sortBy);

export const selectSortOrderFilter = createSelector([selectMarketFilters], (filters) => filters?.sortOrder);

export const selectShowOnlyFilter = createSelector([selectMarketFilters], (filters) => filters?.showOnly);

export const selectTrendingSearches = createSelector([selectMarketStore], (ms) => ms?.trendingSearches);

export const selectRecentSearches = createSelector([selectMarketStore], (ms) => ms?.recentSearches);

export const selectSearchResults = createSelector([selectMarketStore], (ms) => ms?.searchResults);

export const selectIsLoadingSearchResults = createSelector([selectMarketStore], (ms) => ms?.isLoadingSearchResults);

export const selectIsLoadingTrendingSearches = createSelector(
  [selectMarketStore],
  (ms) => ms?.isLoadingTrendingSearches
);

export const selectIsLoadingRecentSearches = createSelector([selectMarketStore], (ms) => ms?.isLoadingRecentSearches);
