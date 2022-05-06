import React, { useEffect } from "react";
import { View } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectGainersLosers, selectIsLoadingGainersLosers, startGainersLosersFetch } from "../../../../redux/summary";
import GainerLoser from "./GainerLoser";
import GainerLoserSkeleton from "./GainerLoserSkeleton";
import { GLOBAL_STYLES } from "../../../../styles";

const NUM_SKELETON = 4;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const GainersLosers = ({ coins, isLoading, fetchGainersLosers }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    fetchGainersLosers();
  }, []);

  return (
    <View style={GLOBAL_STYLES.componentContainer}>
      <HeadingWithSeeAll title="Gainers & Losers" subheading="Based on Top 100 Coins" onSeeAllPress={toMarketScreen} />
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

const mapStateToProps = (state) => ({
  coins: selectGainersLosers(state),
  isLoading: selectIsLoadingGainersLosers(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGainersLosers: () => dispatch(startGainersLosersFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(GainersLosers);
