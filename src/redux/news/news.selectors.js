import { createSelector } from "reselect";

const selectNewsStore = (state) => state.news;

export const selectNews = createSelector([selectNewsStore], (ns) => ns.news);

export const selectEvents = createSelector([selectNewsStore], (ns) => ns.events);

export const selectEventFilters = createSelector([selectNewsStore], (ns) => ns.eventFilters);

export const selectIsLoadingNews = createSelector([selectNewsStore], (ns) => ns.isLoadingNews);

export const selectIsLoadingMoreNews = createSelector([selectNewsStore], (ns) => ns.isLoadingMoreNews);

export const selectIsLoadingEvents = createSelector([selectNewsStore], (ns) => ns.isLoadingEvents);

export const selectIsLoadingMoreEvents = createSelector([selectNewsStore], (ns) => ns.isLoadingMoreEvents);

export const selectNewsPage = createSelector([selectNewsStore], (ns) => ns.newsPage);

export const selectEventsPage = createSelector([selectNewsStore], (ns) => ns.eventsPage);

export const selectHasMoreNews = createSelector([selectNewsStore], (ns) => ns.hasMoreNews);

export const selectHasMoreEvents = createSelector([selectNewsStore], (ns) => ns.hasMoreEvents);
