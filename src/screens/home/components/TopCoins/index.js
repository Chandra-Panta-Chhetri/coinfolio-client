import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SeeAllHeading from "../SeeAllHeading";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectTopCoins, fetchTopCoins, selectIsLoadingTopCoins } from "../../../../redux/summary";
import TopCoin, { TopCoinSkeleton } from "./TopCoin";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import SCREEN_NAMES from "../../../../navigators/screen-names";
import { AsyncFlatList } from "../../../../components";
import { updateFilters } from "../../../../redux/market";

const NUM_SKELETON_LOADERS = 5;

const TopCoins = ({ topCoins, isLoadingTopCoins, fetchTopCoins, updateMarketFilters }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => {
    updateMarketFilters({
      sortBy: {
        label: "Market Cap",
        value: "marketCapUsd"
      },
      sortOrder: { label: "Desc", value: "DESC" }
    });
    navigation?.navigate(SCREEN_NAMES.MARKET_OVERVIEW);
  };

  useEffect(() => {
    fetchTopCoins(NUM_SKELETON_LOADERS);
  }, []);

  return (
    <View style={STYLES.container}>
      <SeeAllHeading title="Top Coins" onSeeAllPress={toMarketScreen} />
      <AsyncFlatList
        isLoading={isLoadingTopCoins}
        data={topCoins}
        horizontal
        numSkeletons={NUM_SKELETON_LOADERS}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
        renderSkeleton={TopCoinSkeleton}
        renderDataItem={({ item }) => <TopCoin key={item?.id} coin={item} />}
        displayNoResults={topCoins?.length === 0}
      />
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapStateToProps = (state) => ({
  topCoins: selectTopCoins(state),
  isLoadingTopCoins: selectIsLoadingTopCoins(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopCoins: (limit) => dispatch(fetchTopCoins(limit)),
  updateMarketFilters: (filter) => dispatch(updateFilters(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCoins);
