import React, { useEffect, useMemo } from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";
import { connect } from "react-redux";
import { selectGainersLosers, selectTopCoins, updateGainersLosers, updateTopCoins } from "../../redux/summary";
import { useLivePrices, updatePriceOfCoins, useRefAsState } from "../../hooks";
import SOCKET_EVENT_NAMES from "../../socket/event-names";
import { isNullOrUndefined } from "../../utils";

const HomeScreen = ({ topCoins, gainersLosers, updateTopCoins, updateGainersLosers }) => {
  const combinedCoins = useMemo(() => [...topCoins, ...gainersLosers], [topCoins, gainersLosers]);
  const socket = useLivePrices(combinedCoins);
  const topCoinsRef = useRefAsState(topCoins);
  const gainersLosersRef = useRefAsState(gainersLosers);

  const onNewPrices = (newPrices) => {
    const { wasUpdated: wasTopCoinsUpdated, coins: updatedTopCoins } = updatePriceOfCoins(
      newPrices,
      topCoinsRef.current
    );
    const { wasUpdated: wasGainersLosersUpdated, coins: updatedGainersLosers } = updatePriceOfCoins(
      newPrices,
      gainersLosersRef.current
    );
    if (wasTopCoinsUpdated) {
      // console.log("top coins updated", updatedTopCoins);
      updateTopCoins(updatedTopCoins);
    }
    if (wasGainersLosersUpdated) {
      // console.log("gainers losers updated", updatedGainersLosers);
      updateGainersLosers(updatedGainersLosers);
    }
  };

  useEffect(() => {
    if (!isNullOrUndefined(socket)) {
      // console.log("home - listener init");
      socket.on(SOCKET_EVENT_NAMES.NEW_PRICES, onNewPrices);
    }

    return () => {
      if (!isNullOrUndefined(socket)) {
        // console.log("home - listener removed");
        socket.off(SOCKET_EVENT_NAMES.NEW_PRICES);
      }
    };
  }, [socket]);

  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLES.screenContainer} showsVerticalScrollIndicator={false}>
      <GlobalMarketSummary />
      <ShortcutIcons />
      <TopCoins />
      <GainersLosers />
      <NewsSummaries />
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  topCoins: selectTopCoins(state),
  gainersLosers: selectGainersLosers(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateTopCoins: (updatedTopCoins) => dispatch(updateTopCoins(updatedTopCoins)),
  updateGainersLosers: (updatedGainersLosers) => dispatch(updateGainersLosers(updatedGainersLosers))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
