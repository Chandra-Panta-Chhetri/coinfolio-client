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
import { updateFilters } from "../../../../redux/market";
import { NoResults } from "../../../../components";

const NUM_SKELETON_LOADERS = 4;
const DUMMY_SKELETON_LOADERS_ARRAY = Array(NUM_SKELETON_LOADERS).fill("1");

const GainersLosers = ({ gainersLosers, isLoadingGainersLosers, fetchGainersLosers, updateMarketFilters }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => {
    updateMarketFilters({
      sortBy: {
        label: "Percent Change",
        value: "changePercent24Hr"
      },
      sortOrder: { label: "Desc", value: "DESC" }
    });
    navigation?.navigate(SCREEN_NAMES.MARKET_OVERVIEW);
  };

  useEffect(() => {
    fetchGainersLosers(Math.floor(NUM_SKELETON_LOADERS / 2));
  }, []);

  let content = null;

  if (isLoadingGainersLosers) {
    content = DUMMY_SKELETON_LOADERS_ARRAY.map((_, i) => (
      <GainerLoserSkeleton key={i} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
    ));
  } else if (gainersLosers?.length === 0) {
    content = <NoResults />;
  } else {
    content = gainersLosers.map((c, i) => (
      <GainerLoser key={c?.id} coin={c} containerStyle={i !== 0 ? GLOBAL_STYLES.cardMargin : null} />
    ));
  }

  return (
    <View style={STYLES.container}>
      <SeeAllHeading title="Gainers & Losers" onSeeAllPress={toMarketScreen} />
      <View>{content}</View>
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
  fetchGainersLosers: (limit) => dispatch(fetchGainersLosers(limit)),
  updateMarketFilters: (filter) => dispatch(updateFilters(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(GainersLosers);
