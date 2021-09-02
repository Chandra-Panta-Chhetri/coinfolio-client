import React from "react";
import { View, FlatList } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectGainersLosers,
  selectIsLoadingSummary
} from "../../../redux/summary/summary.selectors";
import { startGainersLosersFetch } from "../../../redux/summary/summary.actions";
import GainerLoser from "./GainerLoser";
import GainerLoserSkeleton from "./GainerLoserSkeleton";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";

const GainersLosers = ({ gainersLosers, isLoading, fetchGainersLosers }) => {
  const navigation = useNavigation();
  const navigateToMarketScreen = () => navigation.navigate("Market");
  const dummySkeletonArray = Array(
    CONSTANTS.GAINERS_LOSERS.NUM_SKELETON_TO_SHOW
  ).fill("1");

  return (
    <View style={GlobalStyles.componentContainer}>
      <HeadingWithSeeAll
        headingTitle="Gainers & Losers"
        subheading="Based on Top 100 Coins"
        onSeeAllBtnPress={navigateToMarketScreen}
      />
      <FlatList
        data={gainersLosers}
        keyExtractor={(gl) => gl.ticker}
        renderItem={(props) => (
          <GainerLoser {...props} navigation={navigation} />
        )}
        scrollEnabled={false}
        listKey="GainersLosersList"
      />
      {isLoading && gainersLosers.length === 0 && (
        <FlatList
          data={dummySkeletonArray}
          keyExtractor={(s, index) => s + index}
          renderItem={() => <GainerLoserSkeleton />}
          scrollEnabled={false}
          listKey="GainersLosersSkeletonList"
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  gainersLosers: selectGainersLosers(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGainersLosers: () => dispatch(startGainersLosersFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(GainersLosers);
