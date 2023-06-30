import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Header, Filters, CoinOverview, CoinOverviewSkeleton } from "./components";
import { GLOBAL_STYLES } from "../../styles";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsFetchingMarkets,
  selectMarkets,
  fetchMarkets,
  selectMarketsPerPage,
  selectIsFetchingMoreMarkets,
  fetchMoreMarkets,
  selectHasMoreMarkets,
  updateMarkets
} from "../../redux/market";
import { InfiniteScroll, NoResults } from "../../components";
import { GLOBAL_CONSTANTS } from "../../constants";
import { useLivePrices, updatePriceOfCoins, useRefAsState } from "../../hooks";
import { isNullOrUndefined } from "../../utils";
import SOCKET_EVENT_NAMES from "../../socket/event-names";

const ListHeader = () => (
  <>
    <Header />
    <Filters />
  </>
);

const renderItem = ({ item, index }) => <CoinOverview item={item} key={item?.id + index} />;

const MarketOverviewScreen = ({
  markets,
  getMarkets,
  isLoadingMarkets,
  isLoadingMoreMarkets,
  perPage,
  getMoreMarkets,
  hasMoreMarketsToLoad,
  updateMarkets
}) => {
  const { colors } = useTheme();
  const socket = useLivePrices(markets);
  const marketsRef = useRefAsState(markets);

  const onNewPrices = (newPrices) => {
    const { wasUpdated, coins: updatedMarkets } = updatePriceOfCoins(newPrices, marketsRef.current);
    if (wasUpdated) {
      updateMarkets(updatedMarkets);
    }
  };

  useEffect(() => {
    getMarkets();
  }, []);

  useEffect(() => {
    if (!isNullOrUndefined(socket)) {
      // console.log("markets - listener init");
      socket.on(SOCKET_EVENT_NAMES.NEW_PRICES, onNewPrices);
    }

    return () => {
      if (!isNullOrUndefined(socket)) {
        // console.log("markets - listener removed");
        socket.off(SOCKET_EVENT_NAMES.NEW_PRICES);
      }
    };
  }, [socket]);

  const renderSkeleton = ({ index }) => (
    <CoinOverviewSkeleton customStyle={{ marginBottom: index !== perPage - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0 }} />
  );

  return (
    <InfiniteScroll
      isLoading={isLoadingMarkets}
      isLoadingMore={isLoadingMoreMarkets}
      data={markets}
      numSkeletons={perPage}
      ListHeaderComponent={
        <>
          <Header />
          <Filters />
          {!isLoadingMarkets && !isLoadingMoreMarkets && markets?.length === 0 ? <NoResults /> : null}
        </>
      }
      onEndReached={getMoreMarkets}
      hasMoreToFetch={hasMoreMarketsToLoad}
      ListHeaderComponentStyle={[STYLES.listHeader, { backgroundColor: colors?.background }]}
      renderDataItem={renderItem}
      renderSkeleton={renderSkeleton}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
    />
  );
};

const STYLES = StyleSheet.create({
  listHeader: {
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

const mapStateToProps = (state) => ({
  markets: selectMarkets(state),
  isLoadingMarkets: selectIsFetchingMarkets(state),
  isLoadingMoreMarkets: selectIsFetchingMoreMarkets(state),
  perPage: selectMarketsPerPage(state),
  hasMoreMarketsToLoad: selectHasMoreMarkets(state)
});

const mapDispatchToProps = (dispatch) => ({
  getMarkets: () => dispatch(fetchMarkets()),
  getMoreMarkets: () => dispatch(fetchMoreMarkets()),
  updateMarkets: (markets) => dispatch(updateMarkets(markets))
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketOverviewScreen);
