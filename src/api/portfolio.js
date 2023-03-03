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
  },
  {
    nickname: "Portfolio 4",
    id: 4
  },
  {
    nickname: "Portfolio 5",
    id: 5
  },
  {
    nickname: "Portfolio 6",
    id: 6
  },
  {
    nickname: "Portfolio 7",
    id: 7
  },
  {
    nickname: "Portfolio 8",
    id: 8
  },
  {
    nickname: "Portfolio 9",
    id: 9
  },
  {
    nickname: "Portfolio 10",
    id: 10
  },
  {
    nickname: "Portfolio 8",
    id: 11
  },
  {
    nickname: "Portfolio 9",
    id: 12
  },
  {
    nickname: "Portfolio 10",
    id: 13
  },
  {
    nickname: "Portfolio 8",
    id: 14
  },
  {
    nickname: "Portfolio 9",
    id: 15
  },
  {
    nickname: "Portfolio 10",
    id: 16
  },
  {
    nickname: "Portfolio 8",
    id: 17
  },
  {
    nickname: "Portfolio 9",
    id: 18
  },
  {
    nickname: "Portfolio 10",
    id: 19
  }
];

export const getOverview = async (portfolioId, token) => {
  // const res = await axios.get(`/portfolios/${portfolioId}/overview`, {
  //   headers: {
  //     "X-Auth-Token": token
  //   }
  // });
  // return res.data;
  return mockedOverview;
};

export const getUserPortfolios = async (token) => {
  // const res = await axios.get(`/portfolios`, {
  //   headers: {
  //     "X-Auth-Token": token
  //   }
  // });
  // return res?.data?.data;
  return mockedPortfolios;
};
