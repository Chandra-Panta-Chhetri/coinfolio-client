import { createSelector } from "reselect";

const selectDiscoverStore = (state) => state.discover;

export const selectNews = createSelector([selectDiscoverStore], (ds) => ds.news);

export const selectEvents = createSelector([selectDiscoverStore], (ds) => ds.events);

export const selectEventFilters = createSelector([selectDiscoverStore], (ds) => ds.eventFilters);

export const selectIsLoadingNews = createSelector([selectDiscoverStore], (ds) => ds.isLoadingNews);

export const selectIsLoadingMoreNews = createSelector([selectDiscoverStore], (ds) => ds.isLoadingMoreNews);

export const selectIsLoadingEvents = createSelector([selectDiscoverStore], (ds) => ds.isLoadingEvents);

export const selectIsLoadingMoreEvents = createSelector([selectDiscoverStore], (ds) => ds.isLoadingMoreEvents);

export const selectNewsPage = createSelector([selectDiscoverStore], (ds) => ds.newsPage);

export const selectEventsPage = createSelector([selectDiscoverStore], (ds) => ds.eventsPage);

export const selectHasMoreNews = createSelector([selectDiscoverStore], (ds) => ds.hasMoreNews);

export const selectHasMoreEvents = createSelector([selectDiscoverStore], (ds) => ds.hasMoreEvents);
