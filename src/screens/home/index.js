import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";
import { connect } from "react-redux";
import { selectGainersLosers, selectTopCoins, updateGainersLosers, updateTopCoins } from "../../redux/summary";
import { useLivePrices, updatePrice } from "../../hooks";

const HomeScreen = ({ topCoins, gainersLosers, updateTopCoins, updateGainersLosers }) => {
  const socket = useLivePrices([...topCoins, ...gainersLosers]);

  const onNewPrices = (newPrices = {}) => {
    let updatedTopCoins = [...topCoins];
    let updatedGainersLosers = [...gainersLosers];
    for (let id in newPrices) {
      updatedTopCoins = updatePrice(id, updatedTopCoins, newPrices[id]);
      updatedGainersLosers = updatePrice(id, updatedGainersLosers, newPrices[id]);
    }
    updateTopCoins(updatedTopCoins);
    updateGainersLosers(updatedTopCoins);
  };

  useEffect(() => {
    if (socket !== null) {
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
