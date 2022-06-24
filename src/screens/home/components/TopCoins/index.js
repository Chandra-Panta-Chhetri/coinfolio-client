import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectTopCoins, startTopCoinsFetch, selectIsLoadingTopCoins } from "../../../../redux/summary";
import TopCoin from "./TopCoin";
import TopCoinSkeleton from "./TopCoinSkeleton";
import { GLOBAL_STYLES } from "../../../../styles";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const NUM_SKELETON = 5;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const TopCoins = ({ coins, isLoading, fetchTopCoins }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    fetchTopCoins(NUM_SKELETON);
  }, []);

  return (
    <View style={STYLES.container}>
      <HeadingWithSeeAll title="Top Coins" onSeeAllPress={toMarketScreen} />
      {isLoading || coins.length === 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DUMMY_SKELETON_ARRAY}
          contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
          keyExtractor={(_, i) => i}
          renderItem={TopCoinSkeleton}
        />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={coins}
          contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => <TopCoin item={item} />}
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
  coins: selectTopCoins(state),
  isLoading: selectIsLoadingTopCoins(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopCoins: (limit) => dispatch(startTopCoinsFetch(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCoins);
