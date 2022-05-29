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

const ListHeader = () => (
  <>
    <Header />
    <Filters />
  </>
);

const renderItem = ({ item, index }) => <OverviewItem item={item} key={item.id + index} />;

const MarketOverviewScreen = ({ markets, getMarkets, isLoading, isLoadingMore, perPage, getMoreMarkets, hasMore }) => {
  useEffect(() => {
    getMarkets();
  }, []);

  const { colors } = useTheme();

  const renderSkeleton = ({ index }) => (
    <Skeleton
      style={[
        STYLES.itemSkeleton,
        { marginBottom: index !== perPage - 1 ? GLOBAL_STYLES.smMarginBottom.marginBottom : 0 }
      ]}
    />
  );

  return (
    <InfiniteScroll
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      data={markets}
      numSkeletons={perPage}
      ListHeaderComponent={ListHeader}
      onEndReached={getMoreMarkets}
      hasMoreToFetch={hasMore}
      ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors.background }]}
      renderDataItem={renderItem}
      renderSkeleton={renderSkeleton}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
    />
  );
};

const STYLES = StyleSheet.create({
  listHeader: {
    ...GLOBAL_STYLES.mdMarginBottom
  },
  itemSkeleton: {
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
