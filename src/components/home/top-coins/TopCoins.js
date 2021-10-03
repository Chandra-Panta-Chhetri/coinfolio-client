import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectTopCoins,
  selectIsLoadingSummary
} from "../../../redux/summary/summary.selectors";
import { startTopCoinsFetch } from "../../../redux/summary/summary.actions";
import TopCoin from "./TopCoin";
import TopCoinSkeleton from "./TopCoinSkeleton";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";

const dummySkeletonArray = Array(CONSTANTS.TOP_COINS.NUM_SKELETON_TO_SHOW).fill(
  "1"
);

const TopCoins = ({ topCoins, isLoading, fetchTopCoins }) => {
  const navigation = useNavigation();
  const navigateToMarketScreen = () => navigation.navigate("Market");

  useEffect(() => {
    fetchTopCoins();
  }, []);

  return (
    <View style={GlobalStyles.componentContainer}>
      <HeadingWithSeeAll
        headingTitle="Top Coins"
        onSeeAllBtnPress={navigateToMarketScreen}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={topCoins}
        contentContainerStyle={GlobalStyles.flatListContentContainer}
        keyExtractor={(tm) => tm.ticker}
        renderItem={(props) => <TopCoin {...props} navigation={navigation} />}
        listKey="TopCoinsList"
      />
      {isLoading && topCoins.length === 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dummySkeletonArray}
          contentContainerStyle={GlobalStyles.flatListContentContainer}
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
