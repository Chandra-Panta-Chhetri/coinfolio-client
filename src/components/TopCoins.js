import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import {
  selectTopCoins,
  selectIsLoadingSummary
} from "../redux/summary/summary.selectors";
import { startTopCoinsFetch } from "../redux/summary/summary.actions";

const TopCoin = ({ item, navigation }) => (
  <TouchableOpacity activeOpacity={0.6}>
    <Card style={styles.topCoinCard}>
      <Card.Content>
        <Avatar.Image
          size={30}
          source={{
            uri: item.image
          }}
        />
        <Paragraph style={styles.topCoinName}>{item.ticker}</Paragraph>
        <Paragraph style={styles.topCoinPrice}>${item.price}</Paragraph>
        <Paragraph style={styles.topCoinPercent}>
          {item.percentChange > 0 && "+"}
          {item.percentChange}%
        </Paragraph>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const TopCoins = ({ navigation, topCoins, isLoading, fetchTopCoins }) => {
  const navigateToMarketScreen = () => navigation.navigate("Market");

  if (isLoading) {
    return null;
  }

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  topCoinCards: {
    marginTop: 10
  },
  topCoinCard: {
    marginRight: 10,
    borderRadius: 13,
    width: 125
  },
  topCoinName: {
    fontWeight: "bold",
    marginTop: 10
  },
  topCoinPrice: {
    color: "darkgray"
  },
  topCoinPercent: {
    color: "red",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 12
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
