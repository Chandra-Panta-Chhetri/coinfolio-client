import React from "react";
import { Text } from "react-native-paper";

const MarketPairRow = ({ marketPair, cellStyle }) => {
  return (
    <>
      <Text style={cellStyle}>{marketPair?.name}</Text>
      <Text style={cellStyle}>{marketPair?.pair}</Text>
      <Text style={cellStyle} numberOfLines={1}>
        {marketPair?.priceUsd}
      </Text>
      <Text style={cellStyle} numberOfLines={1}>
        {marketPair?.vol24h}
      </Text>
    </>
  );
};

export default MarketPairRow;
