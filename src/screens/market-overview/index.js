import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Header, Filters, OverviewItem } from "./components";
import { GLOBAL_STYLES } from "../../styles";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsFetchingMarkets,
  selectMarkets,
  startMarketsFetch,
  selectMarketsPerPage,
  selectIsFetchingMoreMarkets,
  startNextMarketsFetch,
  selectHasMoreMarkets
} from "../../redux/market";
import { Skeleton, InfiniteScroll } from "../../shared-components";

const ListHeaderComponent = () => (
  <>
    <Header />
    <Filters />
  </>
);

const MarketOverviewScreen = ({ markets, getMarkets, isLoading, isLoadingMore, perPage, getMoreMarkets, hasMore }) => {
  const renderMarketItemSkeleton = ({ index }) => (
    <Skeleton style={[STYLES.overviewItemSkeleton, { marginBottom: index !== perPage - 1 ? 6 : 0 }]} />
  );

  const renderMarketItem = ({ item, index }) => (
    <OverviewItem
      item={item}
      key={item.id + index}
      containerStyle={{ marginBottom: index !== markets.length - 1 ? 6 : 0 }}
    />
  );

  useEffect(() => {
    getMarkets();
  }, []);

  const { colors } = useTheme();

  return (
    <InfiniteScroll
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      data={markets}
      numSkeletons={perPage}
      ListHeaderComponent={ListHeaderComponent}
      onEndReached={getMoreMarkets}
      hasMoreToFetch={hasMore}
      ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors.background }]}
      renderDataItem={renderMarketItem}
      renderSkeleton={renderMarketItemSkeleton}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
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
  isLoading: selectIsFetchingMarkets(state),
  isLoadingMore: selectIsFetchingMoreMarkets(state),
  perPage: selectMarketsPerPage(state),
  hasMore: selectHasMoreMarkets(state)
});

const mapDispatchToProps = (dispatch) => ({
  getMarkets: () => dispatch(startMarketsFetch()),
  getMoreMarkets: () => dispatch(startNextMarketsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketOverviewScreen);
