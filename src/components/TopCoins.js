import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import {
  selectTopCoins,
  selectIsLoadingSummary
} from "../redux/summary/summary.selectors";
import { startTopCoinsFetch } from "../redux/summary/summary.actions";
import TopCoinCard from "./TopCoinCard";
import TopCoinSkeletonCard from "./TopCoinCardSkeleton";

const NUM_SKELETON_TO_SHOW = 10;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON_TO_SHOW).fill("1");

const TopCoins = ({ navigation, topCoins, isLoading, fetchTopCoins }) => {
  const navigateToMarketScreen = () => navigation.navigate("Market");

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
        renderItem={(props) => (
          <TopCoinCard {...props} navigation={navigation} />
        )}
        listKey="TopCoinsList"
      />
      {isLoading && topCoins.length === 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.topCoinCards}
          data={DUMMY_SKELETON_ARRAY}
          keyExtractor={(s, index) => s + index}
          renderItem={() => <TopCoinSkeletonCard />}
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
