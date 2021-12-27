import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Header, Filters, OverviewItem } from "./components";
import { GLOBAL_STYLES } from "../../styles";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectIsFetchingMarkets, selectMarkets, startMarketsFetch, selectMarketsPerPage } from "../../redux/market";
import { Skeleton } from "../../shared-components";

const MarketOverviewScreen = ({ markets = [], getMarkets, isLoadingMarkets, perPage }) => {
  useEffect(() => {
    getMarkets();
  }, []);

  const { colors } = useTheme();
  const DUMMY_SKELETON_ARRAY = Array(perPage).fill("1");

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Header />
          <Filters />
        </>
      }
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      showsVerticalScrollIndicator={false}
      data={isLoadingMarkets ? DUMMY_SKELETON_ARRAY : markets}
      keyExtractor={(m, i) => (m.rank || 0) + i}
      ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors.background }]}
      stickyHeaderIndices={[0]}
      renderItem={({ item, index }) => {
        const marginBottom = { marginBottom: index !== markets.length - 1 ? 6 : 0 };
        return isLoadingMarkets ? (
          <Skeleton style={[STYLES.overviewItemSkeleton, marginBottom]} />
        ) : (
          <OverviewItem item={item} containerStyle={marginBottom} />
        );
      }}
    />
  );
};

const STYLES = StyleSheet.create({
  listHeader: {
    marginBottom: 10
  },
  overviewItemSkeleton: {
    width: "100%",
    height: 60
  }
});

const mapStateToProps = (state) => ({
  markets: selectMarkets(state),
  isLoadingMarkets: selectIsFetchingMarkets(state),
  perPage: selectMarketsPerPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  getMarkets: () => dispatch(startMarketsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketOverviewScreen);
