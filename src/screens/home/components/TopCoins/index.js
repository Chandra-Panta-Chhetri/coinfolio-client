import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import SeeAllHeading from "../SeeAllHeading";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectTopCoins, fetchTopCoins, selectIsLoadingTopCoins } from "../../../../redux/summary";
import TopCoin, { TopCoinSkeleton } from "./TopCoin";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import SCREEN_NAMES from "../../../../navigators/screen-names";
import { isNullOrUndefined } from "../../../../utils";

const NUM_SKELETON_LOADERS = 5;
const DUMMY_SKELETON_LOADERS_ARRAY = Array(NUM_SKELETON_LOADERS).fill("1");

const keyExtractor = (c) => c?.id;

const TopCoins = ({ topCoins, isLoadingTopCoins, fetchTopCoins }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => navigation.navigate(SCREEN_NAMES.MARKET_OVERVIEW);

  useEffect(() => {
    fetchTopCoins(NUM_SKELETON_LOADERS);
  }, []);

  return (
    <View style={STYLES.container}>
      <SeeAllHeading title="Top Coins" onSeeAllPress={toMarketScreen} />
      {isLoadingTopCoins || isNullOrUndefined(topCoins) || topCoins?.length === 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DUMMY_SKELETON_LOADERS_ARRAY}
          contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
          keyExtractor={(_, i) => i}
          renderItem={TopCoinSkeleton}
        />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={topCoins}
          contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => <TopCoin coin={item} />}
        />
      )}
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
  fetchTopCoins: (limit) => dispatch(fetchTopCoins(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCoins);
