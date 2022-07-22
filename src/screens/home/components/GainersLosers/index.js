import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectGainersLosers, selectIsLoadingGainersLosers, startGainersLosersFetch } from "../../../../redux/summary";
import GainerLoser from "./GainerLoser";
import GainerLoserSkeleton from "./GainerLoserSkeleton";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const NUM_SKELETON = 4;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const GainersLosers = ({ coins, isLoading, fetchGainersLosers }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    fetchGainersLosers(Math.floor(NUM_SKELETON / 2));
  }, []);

  return (
    <View style={STYLES.container}>
      <HeadingWithSeeAll title="Gainers & Losers" onSeeAllPress={toMarketScreen} />
      <View>
        {isLoading || coins.length === 0
          ? DUMMY_SKELETON_ARRAY.map((_, i) => (
              <GainerLoserSkeleton key={i} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))
          : coins.map((c, i) => (
              <GainerLoser key={c.id} coin={c} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))}
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapStateToProps = (state) => ({
  coins: selectGainersLosers(state),
  isLoading: selectIsLoadingGainersLosers(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGainersLosers: (limit) => dispatch(startGainersLosersFetch(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(GainersLosers);
