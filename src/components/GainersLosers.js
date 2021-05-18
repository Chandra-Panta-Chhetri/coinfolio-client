import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";
import { connect } from "react-redux";
import {
  selectGainersLosers,
  selectIsLoadingSummary
} from "../redux/summary/summary.selectors";
import { startGainersLosersFetch } from "../redux/summary/summary.actions";

const GainerLoser = ({ item, navigation }) => (
  <TouchableOpacity activeOpacity={0.6}>
    <Card style={styles.gainerLoserCard}>
      <Card.Content style={styles.gainerLoserCardBody}>
        <Avatar.Image
          size={35}
          source={{
            uri: item.image
          }}
        />
        <View style={styles.gainerLoserInfoContainer}>
          <View>
            <Paragraph style={styles.gainerLoserFullName}>
              {item.fullName}
            </Paragraph>
            <Paragraph style={styles.gainerLoserTicker}>
              {item.ticker}
            </Paragraph>
          </View>
          <View style={styles.priceAndPercent}>
            <Paragraph style={styles.gainerLoserPrice}>${item.price}</Paragraph>
            <Paragraph style={styles.gainerLoserPercent}>
              {item.percentChange > 0 && "+"}
              {item.percentChange}%
            </Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const GainersLosers = ({
  navigation,
  gainersLosers,
  isLoading,
  fetchGainersLosers
}) => {
  const navigateToMarketScreen = () => navigation.navigate("Market");

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeadingWithSeeAll
        headingTitle="Gainers & Losers"
        onSeeAllBtnPress={navigateToMarketScreen}
      />
      <FlatList
        style={styles.gainersLosersCards}
        data={gainersLosers}
        keyExtractor={(gl) => gl.ticker}
        renderItem={(props) => (
          <GainerLoser {...props} navigation={navigation} />
        )}
        scrollEnabled={false}
        listKey="GainersLosersList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  gainersLosersCards: { marginTop: 10 },
  gainerLoserCard: {
    marginBottom: 10,
    borderRadius: 13
  },
  gainerLoserCardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  gainerLoserFullName: {
    fontWeight: "bold",
    fontSize: 18
  },
  gainerLoserTicker: {
    color: "darkgray",
    fontWeight: "bold",
    fontSize: 13
  },
  gainerLoserPrice: {
    fontWeight: "bold",
    fontSize: 18
  },
  gainerLoserPercent: {
    color: "green",
    fontSize: 13
  },
  gainerLoserInfoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10
  },
  priceAndPercent: {
    alignItems: "flex-end"
  }
});

const mapStateToProps = (state) => ({
  gainersLosers: selectGainersLosers(state),
  isLoading: selectIsLoadingSummary(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchGainersLosers: () => dispatch(startGainersLosersFetch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(GainersLosers));
