import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import {
  selectTopCoins,
  selectIsLoadingSummary
} from "../../../redux/summary/summary.selectors";
import { startTopCoinsFetch } from "../../../redux/summary/summary.actions";
import TopCoin from "./TopCoin";
import TopCoinSkeleton from "./TopCoinSkeleton";
import CONSTANTS from "../../../Constants";

const TopCoins = ({ navigation, topCoins, isLoading, fetchTopCoins }) => {
  const navigateToMarketScreen = () => navigation.navigate("Market");
  const dummySkeletonArray = Array(
    CONSTANTS.TOP_COINS.NUM_SKELETON_TO_SHOW
  ).fill("1");

  return (
    <View style={styles.container}>
      <HeadingWithSeeAll
        headingTitle="Top Coins"
        onSeeAllBtnPress={navigateToMarketScreen}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.topCoinCards}
        data={topCoins}
        keyExtractor={(tm) => tm.ticker}
        renderItem={(props) => <TopCoin {...props} navigation={navigation} />}
        listKey="TopCoinsList"
      />
      {isLoading && topCoins.length === 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.topCoinCards}
          data={dummySkeletonArray}
          keyExtractor={(s, index) => s + index}
          renderItem={() => <TopCoinSkeleton />}
          listKey="TopCoinsSkeletonList"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  topCoinCards: {
    marginTop: 10
  }
});

const mapStateToProps = (state) => ({
  topCoins: selectTopCoins(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchTopCoins: () => dispatch(startTopCoinsFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(TopCoins));
