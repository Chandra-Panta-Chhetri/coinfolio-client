import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectTopCoins, startTopCoinsFetch, selectIsLoadingTopCoins } from "../../../../redux/summary";
import TopCoin from "./TopCoin";
import TopCoinSkeleton from "./TopCoinSkeleton";
import { GLOBAL_STYLES } from "../../../../styles";

const NUM_SKELETON = 10;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const TopCoins = ({ coins, isLoading, fetchTopCoins }) => {
  const navigation = useNavigation();
  const toMarketScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    fetchTopCoins();
  }, []);

  return (
    <View style={GLOBAL_STYLES.componentContainer}>
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

const mapStateToProps = (state) => ({
  coins: selectTopCoins(state),
  isLoading: selectIsLoadingTopCoins(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopCoins: () => dispatch(startTopCoinsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCoins);
