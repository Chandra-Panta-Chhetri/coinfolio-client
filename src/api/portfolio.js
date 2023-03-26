import axios from "./axios-config";

const mockedOverview = {
  totalValue: "41500.54",
  totalProfitLoss: {
    value: "1200.54",
    percentChange: "0.02979007444"
  },
  totalCost: "40300",
  pieCharts: [
    {
      coinId: "bitcoin",
      percent: "0.93974680811",
      coinSymbol: "BTC",
      coinName: "Bitcoin",
      totalValue: "39000"
    },
    {
      coinId: "ethereum",
      percent: "0.06025319188",
      coinSymbol: "ETH",
      coinName: "Ethereum",
      totalValue: "2500.54"
    }
  ],
  holdings: [
    {
      totalCost: "38000",
      coinId: "bitcoin",
      amount: "1",
      priceUSD: {
        value: "39000",
        percentChange: "1.6508409229657066"
      },
      profitLoss: {
        value: "1000",
        percentChange: "2.63157894737"
      },
      totalValue: "39000",
      avgCost: "38000",
      coinSymbol: "BTC",
      coinName: "Bitcoin",
      coinURL: "https://assets.coincap.io/assets/icons/btc@2x.png"
    },
    {
      totalCost: "2300",
      coinId: "ethereum",
      amount: "1",
      priceUSD: {
        value: "2500.54",
        percentChange: "1.6508409229657066"
      },
      profitLoss: {
        value: "200.54",
        percentChange: "8.71913043478"
      },
      totalValue: "2500.54",
      avgCost: "2300",
      coinSymbol: "ETH",
      coinName: "Ethereum",
      coinURL: "https://assets.coincap.io/assets/icons/eth@2x.png"
    }
  ]
};

const mockedPortfolios = [
  {
    nickname: "Portfolio 1",
    id: 1
  },
  {
    nickname: "Portfolio 2",
    id: 2
  },
  {
    nickname: "Portfolio 3",
    id: 3
  }
];

const mockedTransactionCoins = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coincap.io/assets/icons/btc@2x.png"
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coincap.io/assets/icons/eth@2x.png"
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://assets.coincap.io/assets/icons/sol@2x.png"
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    image: "https://assets.coincap.io/assets/icons/link@2x.png"
  }
];

const mockedNewTransaction = {
  notes: "test notes",
  id: 273233,
  type: "buy",
  quantity: "1.32",
  date: "string",
  pricePerUSD: "15032.5378888",
  coinId: "bitcoin"
};

const mockedHoldingOverview = {
  summary: {
    totalCost: "14.00000000000000000000000",
    coinId: "bitcoin",
    amount: "10.00000000",
    priceUSD: {
      value: "27596.2040217413631765",
      percentChange: "-0.0916358111605964"
    },
    profitLoss: {
      value: "275948.0402174136",
      percentChange: "1971057.430124383"
    },
    totalValue: "275962.0402174136",
    avgCost: "1.40000000000000000000000",
    coinSymbol: "BTC",
    coinName: "Bitcoin",
    coinURL: "https://assets.coincap.io/assets/icons/btc@2x.png"
  },
  transactions: [
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:06:19.843Z",
      id: 1,
      notes: "transaction 1bitcoin",
      pricePerUSD: "1.000000000000000",
      quantity: "10.00000000",
      type: "buy"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:06:19.864Z",
      id: 2,
      notes: "transaction 2bitcoin",
      pricePerUSD: "1.000000000000000",
      quantity: "3.00000000",
      type: "sell"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:06:19.880Z",
      id: 3,
      notes: "transaction 3bitcoin",
      pricePerUSD: "0.000000000000000",
      quantity: "1.00000000",
      type: "transfer_in"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:06:19.881Z",
      id: 4,
      notes: "transaction 4bitcoin",
      pricePerUSD: "0.000000000000000",
      quantity: "2.00000000",
      type: "transfer_out"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:42:23.691Z",
      id: 85,
      notes: "",
      pricePerUSD: "1.000000000000000",
      quantity: "1.00000000",
      type: "buy"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:43:43.152Z",
      id: 86,
      notes: "",
      pricePerUSD: "1.000000000000000",
      quantity: "1.00000000",
      type: "buy"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:46:17.652Z",
      id: 87,
      notes: "",
      pricePerUSD: "1.000000000000000",
      quantity: "1.00000000",
      type: "buy"
    },
    {
      coinId: "bitcoin",
      date: "2023-03-18T23:48:40.039Z",
      id: 88,
      notes: "",
      pricePerUSD: "1.000000000000000",
      quantity: "1.00000000",
      type: "buy"
    }
  ]
};

export const getOverview = async (portfolioId, token) => {
  const res = await axios.get(`/portfolios/${portfolioId}/overview`, {
    headers: {
      "X-Auth-Token": token
    }
  });
  return res.data;
  // return mockedOverview;
};

export const getUserPortfolios = async (token) => {
  const res = await axios.get(`/portfolios`, {
    headers: {
      "X-Auth-Token": token
    }
  });
  return res?.data?.data;
  // await new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res(1);
  //   }, 2000);
  // });
  // return mockedPortfolios;
};

export const createPortfolio = async (token, newPortfolio) => {
  const res = await axios.post(`/portfolios`, newPortfolio, {
    headers: {
      "X-Auth-Token": token
    }
  });
  return res?.data;
  // return {
  //   ...newPortfolio,
  //   id: Math.floor(Math.random() * 100)
  // };
};

export const updatePortfolio = async (token, portfolio, portfolioId) => {
  const res = await axios.patch(`/portfolios/${portfolioId}`, portfolio, {
    headers: {
      "X-Auth-Token": token
    }
  });
  return res?.data;
  // return {
  //   ...portfolio,
  //   id: portfolioId
  // };
};

export const deletePortfolio = async (token, portfolioId) => {
  const res = await axios.delete(`/portfolios/${portfolioId}`, {
    headers: {
      "X-Auth-Token": token
    }
  });
  return res?.data;
};

export const getTransactionCoins = async (token, query) => {
  const res = await axios.get(`/portfolios/supported-coins`, {
    headers: {
      "X-Auth-Token": token
    },
    params: query
  });
  return res?.data?.data;
  // await new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res(1);
  //   }, 2000);
  // });
  // return mockedTransactionCoins;
};

export const addTransaction = async (token, transaction, portfolioId) => {
  if (portfolioId !== null || portfolioId !== undefined) {
    const res = await axios.post(`/portfolios/${portfolioId}/transactions`, transaction, {
      headers: {
        "X-Auth-Token": token
      }
    });
    return res?.data;
  }
  return null;
  // return mockedNewTransaction;
};

export const removeHolding = async (coinId, portfolioId, token) => {
  if (portfolioId !== undefined || portfolioId !== null) {
    const res = await axios.delete(`/portfolios/${portfolioId}/transactions`, {
      headers: {
        "X-Auth-Token": token
      },
      params: {
        coinId
      }
    });
    return res?.data;
  }
  return null;
};

export const getHoldingOverview = async (coinId, portfolioId, token) => {
  if (portfolioId !== undefined || portfolioId !== null) {
    const res = await axios.get(`/portfolios/${portfolioId}/holdings/${coinId}/overview`, {
      headers: {
        "X-Auth-Token": token
      }
    });
    return res?.data;
  }
  return null;
};
