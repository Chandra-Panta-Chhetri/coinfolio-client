import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import SeeAllHeading from "../SeeAllHeading";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectGainersLosers, selectIsLoadingGainersLosers, fetchGainersLosers } from "../../../../redux/summary";
import GainerLoser, { GainerLoserSkeleton } from "./GainerLoser";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import SCREEN_NAMES from "../../../../navigators/screen-names";
import { isNullOrUndefined } from "../../../../utils";

const NUM_SKELETON_LOADERS = 4;
const DUMMY_SKELETON_LOADERS_ARRAY = Array(NUM_SKELETON_LOADERS).fill("1");

const GainersLosers = ({ gainersLosers, isLoadingGainersLosers, fetchGainersLosers }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => navigation?.navigate(SCREEN_NAMES.MARKET_OVERVIEW);

  useEffect(() => {
    fetchGainersLosers(Math.floor(NUM_SKELETON_LOADERS / 2));
  }, []);

  return (
    <View style={STYLES.container}>
      <SeeAllHeading title="Gainers & Losers" onSeeAllPress={toMarketScreen} />
      <View>
        {isLoadingGainersLosers || isNullOrUndefined(gainersLosers) || gainersLosers?.length === 0
          ? DUMMY_SKELETON_LOADERS_ARRAY.map((_, i) => (
              <GainerLoserSkeleton key={i} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
            ))
          : gainersLosers.map((c, i) => (
              <GainerLoser key={c?.id} coin={c} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
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
  gainersLosers: selectGainersLosers(state),
  isLoadingGainersLosers: selectIsLoadingGainersLosers(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGainersLosers: (limit) => dispatch(fetchGainersLosers(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(GainersLosers);
