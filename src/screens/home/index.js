import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";
import { connect } from "react-redux";
import { selectGainersLosers, selectTopCoins, updateGainersLosers, updateTopCoins } from "../../redux/summary";
import { useLivePrices, updatePriceOfCoins } from "../../hooks";

const HomeScreen = ({ topCoins, gainersLosers, updateTopCoins, updateGainersLosers }) => {
  const socket = useLivePrices([...topCoins, ...gainersLosers]);

  const onNewPrices = (newPrices) => {
    const { wasUpdated: wasTopCoinsUpdated, coins: updatedTopCoins } = updatePriceOfCoins(newPrices, topCoins);
    const { wasUpdated: wasGainersLosersUpdated, coins: updatedGainersLosers } = updatePriceOfCoins(
      newPrices,
      gainersLosers
    );
    if (wasTopCoinsUpdated) {
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
      console.log("home - new prices init");
      socket.on("new prices", onNewPrices);
    }
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
