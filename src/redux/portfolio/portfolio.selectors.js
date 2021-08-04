import { createSelector } from "reselect";

const selectPortfolio = (state) => state.portfolio;

export const selectPortfolioDetails = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio.portfolio
);

export const selectTransactions = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio.transactions
);

export const selectNumLoadingReq = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio.numLoadingReq
);

export const selectIsLoadingPortfolio = createSelector(
  [selectNumLoadingReq],
  (numLoadingReq) => numLoadingReq > 0
);

export const selectPortfolioAssets = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio.assets
);
