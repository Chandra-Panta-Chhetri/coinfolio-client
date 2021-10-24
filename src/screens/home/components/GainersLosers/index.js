import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import HeadingWithSeeAll from "../HeadingWithSeeAll";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  selectGainersLosers,
  selectIsLoadingSummary,
  startGainersLosersFetch
} from "../../../../redux/summary";
import GainerLoser from "./GainerLoser";
import GainerLoserSkeleton from "./GainerLoserSkeleton";
import { GLOBAL_STYLES } from "../../../../styles";

const NUM_SKELETON = 4;
const DUMMY_SKELETON_ARRAY = Array(NUM_SKELETON).fill("1");

const GainersLosers = ({ gainersLosers, isLoading, fetchGainersLosers }) => {
  const navigation = useNavigation();
  const navigateToMarketScreen = () => navigation.navigate("MarketOverview");

  useEffect(() => {
    fetchGainersLosers();
  }, []);

  return (
    <View style={GLOBAL_STYLES.componentContainer}>
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
        style={GLOBAL_STYLES.flatListContentContainer}
        listKey="GainersLosersList"
      />
      {isLoading && gainersLosers.length === 0 && (
        <FlatList
          data={DUMMY_SKELETON_ARRAY}
          keyExtractor={(s, index) => s + index}
          renderItem={({ index }) => (
            <GainerLoserSkeleton
              containerStyle={index !== 0 ? STYLES.itemContainer : null}
            />
          )}
          scrollEnabled={false}
          style={GLOBAL_STYLES.flatListContentContainer}
          listKey="GainersLosersSkeletonList"
        />
      )}
    </View>
  );
};

const STYLES = StyleSheet.create({
  itemContainer: {
    marginTop: 10
  }
});

const mapStateToProps = (state) => ({
  gainersLosers: selectGainersLosers(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGainersLosers: () => dispatch(startGainersLosersFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(GainersLosers);
