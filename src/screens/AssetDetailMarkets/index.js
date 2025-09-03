import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { Table } from "../../components";
import { connect } from "react-redux";
import { selectAssetMarkets, selectIsLoadingAssetMarkets, fetchAssetMarkets } from "../../redux/asset-detail";
import { MarketPairRow, MarketPairsSkeleton } from "./components";
import { selectSelectedCurrency } from "../../redux/currency";

const TABLE_HEADINGS = ["Name", "Pair", "Price", "24H Volume"];

const AssetDetailMarketsScreen = ({ fetchMarketPairs, marketPairs, isLoadingMarketPairs, route, selectedCurrency }) => {
  const { params } = route;

  useEffect(() => {
    fetchMarketPairs(params?.id);
  }, []);

  return isLoadingMarketPairs ? (
    <MarketPairsSkeleton />
  ) : (
    <Table
      headings={TABLE_HEADINGS}
      data={marketPairs}
      containerStyle={STYLES.table}
      renderRow={({ item }, cellStyle) => (
        <MarketPairRow marketPair={item} cellStyle={cellStyle} selectedCurrency={selectedCurrency} />
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
  marketPairs: selectAssetMarkets(state),
  isLoadingMarketPairs: selectIsLoadingAssetMarkets(state),
  selectedCurrency: selectSelectedCurrency(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMarketPairs: (id, query) => dispatch(fetchAssetMarkets(id, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailMarketsScreen);
