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
  selectHasMoreMarkets,
  updateMarkets
} from "../../redux/market";
import { Skeleton, InfiniteScroll } from "../../shared-components";
import { GLOBAL_CONSTANTS } from "../../constants";
import { useLivePrices, updatePriceOfCoins } from "../../hooks";

const ListHeader = () => (
  <>
    <Header />
    <Filters />
  </>
);

const renderItem = ({ item, index }) => <OverviewItem item={item} key={item.id + index} />;

const MarketOverviewScreen = ({
  markets,
  getMarkets,
  isLoading,
  isLoadingMore,
  perPage,
  getMoreMarkets,
  hasMore,
  updateMarkets
}) => {
  const { colors } = useTheme();
  const socket = useLivePrices(markets);

  const onNewPrices = (newPrices) => {
    const { wasUpdated, coins: updatedMarkets } = updatePriceOfCoins(newPrices, markets);
    if (wasUpdated) {
      updateMarkets(updatedMarkets);
    }
  };

  useEffect(() => {
    getMarkets();
  }, []);

  useEffect(() => {
    if (socket !== null) {
      console.log("market overview - new prices init");
      socket.on("new prices", onNewPrices);
    }
  }, [socket]);

  const renderSkeleton = ({ index }) => (
    <Skeleton style={[STYLES.itemSkeleton, { marginBottom: index !== perPage - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0 }]} />
  );

  return (
    <InfiniteScroll
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      data={markets}
      numSkeletons={perPage}
      ListHeaderComponent={ListHeader}
      onEndReached={() => console.log("end reached")}
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
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
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
  getMoreMarkets: () => dispatch(startNextMarketsFetch()),
  updateMarkets: (markets) => dispatch(updateMarkets(markets))
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketOverviewScreen);
