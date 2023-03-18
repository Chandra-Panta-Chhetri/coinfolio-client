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
    console.log(transaction, portfolioId, "ADD TRANSACTION");
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
