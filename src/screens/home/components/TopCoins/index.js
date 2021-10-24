import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectTopCoins,
  selectIsLoadingSummary,
  startTopCoinsFetch
} from "../../../../redux/summary";
import TopCoin from "./TopCoin";
import TopCoinSkeleton from "./TopCoinSkeleton";
import { GLOBAL_STYLES } from "../../../../styles";

const NUM_SKELETON = 10;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const TopCoins = ({ topCoins, isLoading, fetchTopCoins }) => {
  const navigation = useNavigation();
  const navigateToMarketScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    fetchTopCoins();
  }, []);

  return (
    <View style={GLOBAL_STYLES.componentContainer}>
      <HeadingWithSeeAll
        headingTitle="Top Coins"
        onSeeAllBtnPress={navigateToMarketScreen}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topCoins}
        contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
        keyExtractor={(tm) => tm.ticker}
        renderItem={(props) => <TopCoin {...props} navigation={navigation} />}
        listKey="TopCoinsList"
      />
      {isLoading && topCoins.length === 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DUMMY_SKELETON_ARRAY}
          contentContainerStyle={GLOBAL_STYLES.flatListContentContainer}
          keyExtractor={(s, index) => s + index}
          renderItem={() => <TopCoinSkeleton />}
          listKey="TopCoinsSkeletonList"
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  topCoins: selectTopCoins(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopCoins: () => dispatch(startTopCoinsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCoins);
