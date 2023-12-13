import React from "react";
import { Text } from "react-native-paper";
import { formatPrice } from "../../../utils";

const MarketPairRow = ({ marketPair, cellStyle, selectedCurrency }) => {
  return (
    <>
      <Text style={cellStyle}>{marketPair?.name}</Text>
      <Text style={cellStyle}>{marketPair?.pair}</Text>
      <Text style={cellStyle} numberOfLines={1}>
        {formatPrice(marketPair?.priceUsd, false, selectedCurrency)}
      </Text>
      <Text style={cellStyle} numberOfLines={1}>
        {formatPrice(marketPair?.vol24h, false, selectedCurrency)}
      </Text>
    </>
  );
};

export default MarketPairRow;
