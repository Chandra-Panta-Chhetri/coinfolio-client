import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Header, Filters, OverviewItem } from "./components";
import { GLOBAL_STYLES } from "../../styles";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectIsFetchingMarkets, selectMarkets, startMarketsFetch, selectMarketsPerPage } from "../../redux/market";
import { Skeleton } from "../../shared-components";

const ListHeaderComponent = () => (
  <>
    <Header />
    <Filters />
  </>
);

const MarketOverviewScreen = ({ markets = [], getMarkets, isLoadingMarkets, perPage }) => {
  useEffect(() => {
    getMarkets();
  }, []);

  const { colors } = useTheme();
  const DUMMY_SKELETON_ARRAY = Array(perPage).fill("1");

  if (isLoadingMarkets) {
    return (
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={GLOBAL_STYLES.screenContainer}
        showsVerticalScrollIndicator={false}
        data={DUMMY_SKELETON_ARRAY}
        keyExtractor={(_, i) => i}
        ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors.background }]}
        stickyHeaderIndices={[0]}
        renderItem={({ _, index }) => (
          <Skeleton
            style={[STYLES.overviewItemSkeleton, { marginBottom: index !== DUMMY_SKELETON_ARRAY.length - 1 ? 6 : 0 }]}
          />
        )}
      />
    );
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      showsVerticalScrollIndicator={false}
      data={markets}
      keyExtractor={(m) => m.rank}
      ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors.background }]}
      stickyHeaderIndices={[0]}
      renderItem={({ item, index }) => (
        <OverviewItem item={item} containerStyle={{ marginBottom: index !== markets.length - 1 ? 6 : 0 }} />
      )}
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
