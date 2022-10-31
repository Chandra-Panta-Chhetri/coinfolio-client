import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { GLOBAL_STYLES } from "../../styles";
import { GlobalMarketSummary, ShortcutIcons, TopCoins, GainersLosers, NewsSummaries } from "./components";
import { pricesSocket } from "../../socket";
import { connect } from "react-redux";
import { selectGainersLosers, selectTopCoins, updateGainersLosers, updateTopCoins } from "../../redux/summary";
import { formatNumWorklet } from "../../utils";

const HomeScreen = ({ topCoins, gainersLosers, updateTopCoins, updateGainersLosers }) => {
  const socket = useRef(null);

  useEffect(() => {
    if (topCoins.length > 0 && gainersLosers.length > 0 && socket.current === null) {
      const coinsToWatch = [...topCoins, ...gainersLosers];
      socket.current = pricesSocket.connectToLivePrices(coinsToWatch);

      socket.current.on("new prices", (newPrices) => {
        const updatedTopCoins = [...topCoins];
        const updatedGainersLosers = [...gainersLosers];
        for (let id in newPrices) {
          if (newPrices.hasOwnProperty(id)) {
            for (let coin of updatedTopCoins) {
              if (coin.id === id) {
                coin.priceUsd = `$${formatNumWorklet(newPrices[id])}`;
              }
            }
          }
        }
        updateTopCoins(updatedTopCoins);
        updateGainersLosers(updatedGainersLosers);
      });
    }
  }, [topCoins, gainersLosers]);

  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

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
