import { createSelector } from "reselect";

const selectAssetDetailStore = (state) => state?.assetDetail;

export const selectAssetMarkets = createSelector([selectAssetDetailStore], (ad) => ad?.markets);

export const selectIsLoadingAssetMarkets = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingMarkets);

export const selectAssetOverview = createSelector([selectAssetDetailStore], (ad) => ad?.overview);

export const selectIsLoadingAssetOverview = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingOverview);

export const selectAssetAbout = createSelector([selectAssetDetailStore], (ad) => ad?.about);

export const selectIsLoadingAssetAbout = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingAbout);

export const selectAssetNews = createSelector([selectAssetDetailStore], (ad) => ad?.news);

export const selectAssetEvents = createSelector([selectAssetDetailStore], (ad) => ad?.events);

export const selectAssetEventFilters = createSelector([selectAssetDetailStore], (ad) => ad?.eventFilters);

export const selectIsLoadingAssetNews = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingNews);

export const selectIsLoadingMoreAssetNews = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingMoreNews);

export const selectIsLoadingAssetEvents = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingEvents);

export const selectIsLoadingMoreAssetEvents = createSelector([selectAssetDetailStore], (ad) => ad?.isLoadingMoreEvents);

export const selectAssetNewsPage = createSelector([selectAssetDetailStore], (ad) => ad?.newsPage);

export const selectAssetEventsPage = createSelector([selectAssetDetailStore], (ad) => ad?.eventsPage);

export const selectHasMoreAssetNews = createSelector([selectAssetDetailStore], (ad) => ad?.hasMoreNews);

export const selectHasMoreAssetEvents = createSelector([selectAssetDetailStore], (ad) => ad?.hasMoreEvents);
