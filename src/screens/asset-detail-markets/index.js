import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { Table } from "../../shared-components";

const tableData = [
  { name: "Binance", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Newton", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Crypto.com", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Coinbase", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "AscendEx", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Kucoin", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "ByBit", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Crypto.com", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Coinbase", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "AscendEx", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Kucoin", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "ByBit", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Crypto.com", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Coinbase", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "AscendEx", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "Kucoin", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" },
  { name: "ByBit", pair: "BTC/USDT", price: "$21,200.52", vol24h: "$2,514,164" }
];

const tableHeadings = ["Name", "Pair", "Price", "24H Volume"];

const AssetDetailMarketsScreen = () => {
  return (
    <Table
      headings={tableHeadings}
      data={tableData}
      containerStyle={STYLES.table}
      renderRow={({ item }, cellStyle) => (
        <>
          <Text style={cellStyle}>{item.name}</Text>
          <Text style={cellStyle}>{item.pair}</Text>
          <Text style={cellStyle}>{item.price}</Text>
          <Text style={cellStyle}>{item.vol24h}</Text>
        </>
      )}
    />
  );
};

const STYLES = StyleSheet.create({
  table: {
    ...GLOBAL_STYLES.screenContainer,
    paddingVertical: 0
  }
});

export default AssetDetailMarketsScreen;
