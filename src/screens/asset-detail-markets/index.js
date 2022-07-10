import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { Table } from "../../shared-components";
import { connect } from "react-redux";
import { selectAssetMarkets, selectIsLoadingAssetMarkets, startAssetMarketsFetch } from "../../redux/asset-detail";
import { MarketsSkeleton } from "./components";

const tableHeadings = ["Name", "Pair", "Price", "24H Volume"];

const AssetDetailMarketsScreen = ({ fetchMarkets, markets, isLoading, route }) => {
  const { params } = route;

  useEffect(() => {
    fetchMarkets(params.id);
  }, []);

  return isLoading ? (
    <MarketsSkeleton />
  ) : (
    <Table
      headings={tableHeadings}
      data={markets}
      containerStyle={STYLES.table}
      renderRow={({ item }, cellStyle) => (
        <>
          <Text style={cellStyle}>{item.name}</Text>
          <Text style={cellStyle}>{item.pair}</Text>
          <Text style={cellStyle} numberOfLines={1}>
            {item.priceUsd}
          </Text>
          <Text style={cellStyle} numberOfLines={1}>
            {item.vol24h}
          </Text>
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

const mapStateToProps = (state) => ({
  markets: selectAssetMarkets(state),
  isLoading: selectIsLoadingAssetMarkets(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMarkets: (id, query) => dispatch(startAssetMarketsFetch(id, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailMarketsScreen);
