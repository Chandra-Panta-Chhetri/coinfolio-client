import { convertDateToISOOffset, isNullOrUndefined } from "../utils";
import axios from "./axios-config";

export const getOverview = async (portfolioId, token) => {
  if (!isNullOrUndefined(portfolioId) && !isNullOrUndefined(token)) {
    const res = await axios.get(`/portfolios/${portfolioId}/overview`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const overview = res?.data;
    return overview;
  }
  return null;
};

export const getUserPortfolios = async (token) => {
  if (!isNullOrUndefined(token)) {
    const res = await axios.get(`/portfolios`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const portfolios = res?.data?.data;
    return portfolios;
  }
  return null;
};

export const createPortfolio = async (token, newPortfolio) => {
  if (!isNullOrUndefined(token) && !isNullOrUndefined(newPortfolio)) {
    const res = await axios.post(`/portfolios`, newPortfolio, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const portfolio = res?.data;
    return portfolio;
  }
  return null;
};

export const updatePortfolio = async (token, portfolio, portfolioId) => {
  if (!isNullOrUndefined(token) && !isNullOrUndefined(portfolio) && !isNullOrUndefined(portfolioId)) {
    const res = await axios.patch(`/portfolios/${portfolioId}`, portfolio, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const updatedPortfolio = res?.data;
    return updatedPortfolio;
  }
  return null;
};

export const deletePortfolio = async (token, portfolioId) => {
  if (!isNullOrUndefined(token) && !isNullOrUndefined(portfolioId)) {
    const res = await axios.delete(`/portfolios/${portfolioId}`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const deletedPortfolio = res?.data;
    return deletedPortfolio;
  }
  return null;
};

export const getTransactionCoins = async (token, query) => {
  if (!isNullOrUndefined(token)) {
    const res = await axios.get(`/portfolios/supported-coins`, {
      headers: {
        "X-Auth-Token": token
      },
      params: query ?? {}
    });
    const transactionCoins = res?.data?.data;
    return transactionCoins;
  }
  return null;
};

export const addTransaction = async (token, transaction, portfolioId) => {
  if (!isNullOrUndefined(portfolioId) && !isNullOrUndefined(transaction) && !isNullOrUndefined(token)) {
    transaction.date = convertDateToISOOffset(transaction?.date);
    const res = await axios.post(`/portfolios/${portfolioId}/transactions`, transaction, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const createdTransaction = res?.data;
    return createdTransaction;
  }
  return null;
};

export const removeHolding = async (coinId, portfolioId, token) => {
  if (!isNullOrUndefined(token) && !isNullOrUndefined(coinId) && !isNullOrUndefined(portfolioId)) {
    const res = await axios.delete(`/portfolios/${portfolioId}/transactions`, {
      headers: {
        "X-Auth-Token": token
      },
      params: {
        coinId
      }
    });
    const deletedTransactions = res?.data;
    return deletedTransactions;
  }
  return null;
};

export const getHoldingOverview = async (coinId, portfolioId, token) => {
  if (!isNullOrUndefined(token) && !isNullOrUndefined(coinId) && !isNullOrUndefined(portfolioId)) {
    const res = await axios.get(`/portfolios/${portfolioId}/holdings/${coinId}/overview`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const overview = res?.data;
    return overview;
  }
  return null;
};

export const deleteTransaction = async (transaction, portfolioId, token) => {
  if (!isNullOrUndefined(token) && !isNullOrUndefined(transaction) && !isNullOrUndefined(portfolioId)) {
    const res = await axios.delete(`/portfolios/${portfolioId}/transactions/${transaction?.id}`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const deletedTransaction = res?.data;
    return deletedTransaction;
  }
  return null;
};

export const updateTransaction = async (transactionUpdates, portfolioId, token, transactionId) => {
  if (
    !isNullOrUndefined(token) &&
    !isNullOrUndefined(transactionUpdates) &&
    !isNullOrUndefined(portfolioId) &&
    !isNullOrUndefined(transactionId)
  ) {
    transactionUpdates.date = convertDateToISOOffset(transactionUpdates?.date);
    const res = await axios.patch(`/portfolios/${portfolioId}/transactions/${transactionId}`, transactionUpdates, {
      headers: {
        "X-Auth-Token": token
      }
    });
    const transaction = res?.data;
    return transaction;
  }
  return null;
};
