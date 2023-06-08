import { createSelector } from "reselect";

const selectPortfolio = (state) => state?.portfolio;

export const selectCurrentPortfolioValue = createSelector([selectPortfolio], (portfolio) => portfolio?.totalValue);

export const selectTransactions = createSelector([selectPortfolio], (portfolio) => portfolio?.transactions);

export const selectIsLoadingPortfolioOverview = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isLoadingOverview
);

export const selectPortfolioHoldings = createSelector([selectPortfolio], (portfolio) => portfolio?.holdings);

export const selectTotalProfitLoss = createSelector([selectPortfolio], (portfolio) => portfolio?.totalProfitLoss);

export const selectTotalInvested = createSelector([selectPortfolio], (portfolio) => portfolio?.totalCost);

export const selectPortfolioPieCharts = createSelector([selectPortfolio], (portfolio) => portfolio?.pieCharts);

export const selectIsLoadingUserPortfolios = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isLoadingUserPortfolios
);

export const selectUserPortfolios = createSelector([selectPortfolio], (portfolio) => portfolio?.userPortfolios);

export const selectIsUpdatingUserPortfolios = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isUpdatingUserPortfolios
);

export const selectActivePortfolio = createSelector([selectPortfolio], (portfolio) => portfolio?.activePortfolio);

export const selectIsLoadingTransactionCoins = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isLoadingTransactionCoins
);

export const selectTransactionCoins = createSelector([selectPortfolio], (portfolio) => portfolio?.transactionCoins);

export const selectIsAddingTransaction = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isAddingTransaction
);

export const selectIsDeletingHolding = createSelector([selectPortfolio], (portfolio) => portfolio?.isDeletingHolding);

export const selectIsLoadingHoldingOverview = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isLoadingHoldingOverview
);

export const selectHoldingOverview = createSelector([selectPortfolio], (portfolio) => portfolio?.holdingOverview);

export const selectIsDeletingTransaction = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isDeletingTransaction
);

export const selectIsUpdatingTransaction = createSelector(
  [selectPortfolio],
  (portfolio) => portfolio?.isUpdatingTransaction
);
