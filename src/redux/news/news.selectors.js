import { createSelector } from "reselect";

const selectNewsStore = (state) => state.news;

export const selectNews = createSelector([selectNewsStore], (news) => news.news);

export const selectEvents = createSelector([selectNewsStore], (news) => news.events);

export const selectEventFilters = createSelector([selectNewsStore], (news) => news.eventFilters);

export const selectIsLoadingNews = createSelector([selectNewsStore], (news) => news.isLoadingNews);

export const selectIsLoadingMoreNews = createSelector([selectNewsStore], (news) => news.isLoadingMoreNews);

export const selectIsLoadingEvents = createSelector([selectNewsStore], (news) => news.isLoadingEvents);

export const selectIsLoadingMoreEvents = createSelector([selectNewsStore], (news) => news.isLoadingMoreEvents);

export const selectNewsPage = createSelector([selectNewsStore], (news) => news.newsPage);

export const selectEventsPage = createSelector([selectNewsStore], (news) => news.eventsPage);

export const selectHasMoreNews = createSelector([selectNewsStore], (news) => news.hasMoreNews);

export const selectHasMoreEvents = createSelector([selectNewsStore], (news) => news.hasMoreEvents);
