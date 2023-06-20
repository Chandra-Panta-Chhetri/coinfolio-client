import React from "react";
import { Text } from "react-native-paper";
import { formatNum, formatPrice } from "../../../utils";

const MarketPairRow = ({ marketPair, cellStyle }) => {
  return (
    <>
      <Text style={cellStyle}>{marketPair?.name}</Text>
      <Text style={cellStyle}>{marketPair?.pair}</Text>
      <Text style={cellStyle} numberOfLines={1}>
        {formatPrice(marketPair?.priceUsd)}
      </Text>
      <Text style={cellStyle} numberOfLines={1}>
        {`$${formatNum(marketPair?.vol24h, 0)}`}
      </Text>
    </>
  );
};

export default MarketPairRow;
