import React, { useEffect, useRef, useMemo } from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";
import { connect } from "react-redux";
import { selectGainersLosers, selectTopCoins, updateGainersLosers, updateTopCoins } from "../../redux/summary";
import { useLivePrices, updatePriceOfCoins } from "../../hooks";

const HomeScreen = ({ topCoins, gainersLosers, updateTopCoins, updateGainersLosers }) => {
  const combinedCoins = useMemo(() => [...topCoins, ...gainersLosers], [topCoins, gainersLosers]);
  const socket = useLivePrices(combinedCoins);
  const topCoinsRef = useRef(topCoins);
  const gainersLosersRef = useRef(gainersLosers);

  useEffect(() => {
    topCoinsRef.current = topCoins;
  }, [topCoins]);

  useEffect(() => {
    gainersLosersRef.current = gainersLosers;
  }, [gainersLosers]);

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
      console.log(newPrices);
      // console.log("top coins updated", newPrices);
      updateTopCoins(updatedTopCoins);
    }
    if (wasGainersLosersUpdated) {
      // console.log("gainers losers updated", newPrices);
      updateGainersLosers(updatedGainersLosers);
    }
  };

  useEffect(() => {
    if (socket !== null) {
      // console.log("home - listener init");
      socket.on("new prices", onNewPrices);
    }

    return () => {
      if (socket !== null) {
        // console.log("home - listener removed");
        socket.off("new prices");
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
