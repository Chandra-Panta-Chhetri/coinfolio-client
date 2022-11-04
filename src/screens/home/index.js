import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";
import { connect } from "react-redux";
import { selectGainersLosers, selectTopCoins, updateGainersLosers, updateTopCoins } from "../../redux/summary";
import { formatNumWorklet } from "../../utils";
import { useLivePrices } from "../../hooks";

const HomeScreen = ({ topCoins, gainersLosers, updateTopCoins, updateGainersLosers }) => {
  const socket = useLivePrices([...topCoins, ...gainersLosers]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("new prices", (prices) => {
        const updatedTopCoins = [...topCoins];
        const updatedGainersLosers = [...gainersLosers];
        for (let id in prices) {
          if (prices.hasOwnProperty(id)) {
            //sep function
            for (let coin of updatedTopCoins) {
              if (coin.id === id) {
                coin.priceUsd = `$${formatNumWorklet(prices[id])}`;
              }
            }
            for (let coin of updatedGainersLosers) {
              if (coin.id === id) {
                coin.priceUsd = `$${formatNumWorklet(prices[id])}`;
                break;
              }
            }
          }
        }
        updateTopCoins(updatedTopCoins);
        updateGainersLosers(updatedTopCoins);
      });
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
