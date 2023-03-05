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
  console.log(portfolio);
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
