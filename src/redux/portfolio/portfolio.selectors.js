import { createSelector } from "reselect";

const selectPortfolio = (state) => state.portfolio;

export const selectCurrentPortfolioValue = createSelector([selectPortfolio], (portfolio) => portfolio.totalValue);

export const selectTransactions = createSelector([selectPortfolio], (portfolio) => portfolio.transactions);

export const selectIsLoadingPortfolio = createSelector([selectPortfolio], (portfolio) => portfolio.isLoading);

export const selectPortfolioHoldings = createSelector([selectPortfolio], (portfolio) => portfolio.holdings);

export const selectTotalProfitLoss = createSelector([selectPortfolio], (portfolio) => portfolio.totalProfitLoss);

export const selectTotalInvested = createSelector([selectPortfolio], (portfolio) => portfolio.totalCost);

export const selectPortfolioPieCharts = createSelector([selectPortfolio], (portfolio) => portfolio.pieCharts);
