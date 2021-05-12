import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { selectNotifications } from "../redux/notification/notification.selectors";
import { createStructuredSelector } from "reselect";
import { addSuccessNotification } from "../redux/notification/notification.actions";
import {
  Card,
  Paragraph,
  IconButton,
  Caption,
  TouchableRipple,
  Title,
  Headline,
  Avatar
} from "react-native-paper";

function HomeScreen({ navigation }) {
  useEffect(() => {}, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <Card.Content>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>Market Cap: </Paragraph>
              $3,026,234,553,628
            </Paragraph>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>24h Vol: </Paragraph>
              $286,423,453,955
            </Paragraph>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>BTC Dominance: </Paragraph>
              42.4%
            </Paragraph>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>ETH Dominance: </Paragraph>
              19.4%
            </Paragraph>
          </ScrollView>
        </Card.Content>
      </Card>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shortcutIconContainer}
      >
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="bell-alert" color="blue" />
            </View>
            <Caption style={styles.bold}>Price Alerts</Caption>
          </View>
        </TouchableRipple>
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="compare" color="blue" />
            </View>
            <Caption style={styles.bold}>Compare</Caption>
          </View>
        </TouchableRipple>
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="calculator" color="blue" />
            </View>
            <Caption style={styles.bold}>Converter</Caption>
          </View>
        </TouchableRipple>
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="eye" color="blue" />
            </View>
            <Caption style={styles.bold}>Watchlist</Caption>
          </View>
        </TouchableRipple>
      </ScrollView>
      <View style={styles.section}>
        <Headline style={styles.bold}>Top Coins</Headline>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topMoversContainer}
        >
          <Card style={styles.topMoverCard}>
            <Card.Content>
              <Avatar.Image
                size={30}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <Paragraph style={styles.topMoverName}>BTC</Paragraph>
              <Paragraph style={styles.topMoverPrice}>$69,230.24</Paragraph>
              <Paragraph style={styles.topMoverPercent}>-4.25% </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.topMoverCard}>
            <Card.Content>
              <Avatar.Image
                size={30}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <Paragraph style={styles.topMoverName}>BTC</Paragraph>
              <Paragraph style={styles.topMoverPrice}>$69,230.24</Paragraph>
              <Paragraph style={styles.topMoverPercent}>-4.25% </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.topMoverCard}>
            <Card.Content>
              <Avatar.Image
                size={30}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <Paragraph style={styles.topMoverName}>BTC</Paragraph>
              <Paragraph style={styles.topMoverPrice}>$69,230.24</Paragraph>
              <Paragraph style={styles.topMoverPercent}>-4.25% </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.topMoverCard}>
            <Card.Content>
              <Avatar.Image
                size={30}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <Paragraph style={styles.topMoverName}>BTC</Paragraph>
              <Paragraph style={styles.topMoverPrice}>$69,230.24</Paragraph>
              <Paragraph style={styles.topMoverPercent}>-4.25% </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.topMoverCard}>
            <Card.Content>
              <Avatar.Image
                size={30}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <Paragraph style={styles.topMoverName}>BTC</Paragraph>
              <Paragraph style={styles.topMoverPrice}>$69,230.24</Paragraph>
              <Paragraph style={styles.topMoverPercent}>-4.25% </Paragraph>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Headline style={styles.bold}>Gainers & Losers</Headline>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gainerAndLoserContainer}
        >
          <Card style={styles.gainerAndLoserCard}>
            <Card.Content style={styles.gainerAndLoserCardBody}>
              <Avatar.Image
                size={35}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <View style={styles.gainerLoserInfoContainer}>
                <View>
                  <Paragraph style={styles.gainerLoserFullName}>
                    Bitcoin
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserTicker}>BTC</Paragraph>
                </View>
                <View style={styles.priceAndPercent}>
                  <Paragraph style={styles.gainerLoserPrice}>
                    $69,230.24
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserPercent}>
                    +4.25%
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.gainerAndLoserCard}>
            <Card.Content style={styles.gainerAndLoserCardBody}>
              <Avatar.Image
                size={35}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <View style={styles.gainerLoserInfoContainer}>
                <View>
                  <Paragraph style={styles.gainerLoserFullName}>
                    Bitcoin
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserTicker}>BTC</Paragraph>
                </View>
                <View style={styles.priceAndPercent}>
                  <Paragraph style={styles.gainerLoserPrice}>
                    $69,230.24
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserPercent}>
                    +4.25%
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.gainerAndLoserCard}>
            <Card.Content style={styles.gainerAndLoserCardBody}>
              <Avatar.Image
                size={35}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <View style={styles.gainerLoserInfoContainer}>
                <View>
                  <Paragraph style={styles.gainerLoserFullName}>
                    Bitcoin
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserTicker}>BTC</Paragraph>
                </View>
                <View style={styles.priceAndPercent}>
                  <Paragraph style={styles.gainerLoserPrice}>
                    $69,230.24
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserPercent}>
                    +4.25%
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.gainerAndLoserCard}>
            <Card.Content style={styles.gainerAndLoserCardBody}>
              <Avatar.Image
                size={35}
                source={{
                  uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                }}
              />
              <View style={styles.gainerLoserInfoContainer}>
                <View>
                  <Paragraph style={styles.gainerLoserFullName}>
                    Bitcoin
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserTicker}>BTC</Paragraph>
                </View>
                <View style={styles.priceAndPercent}>
                  <Paragraph style={styles.gainerLoserPrice}>
                    $69,230.24
                  </Paragraph>
                  <Paragraph style={styles.gainerLoserPercent}>
                    +4.25%
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  rightMargin: {
    marginRight: 10
  },
  bold: {
    fontWeight: "bold"
  },
  shortcutIconContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginTop: 10
  },
  shortcutIconItem: {
    alignItems: "center",
    padding: 5
  },
  iconButton: {
    borderWidth: 5,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ECECEC"
  },
  topMoversContainer: {
    marginTop: 10
  },
  gainerAndLoserContainer: {
    marginTop: 10
  },
  topMoverCard: {
    backgroundColor: "black",
    marginRight: 10,
    borderRadius: 13
  },
  topMoverName: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10
  },
  topMoverPrice: {
    color: "darkgray"
  },
  topMoverPercent: {
    color: "red",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 12
  },
  section: {
    marginTop: 10
  },
  gainerAndLoserCard: {
    backgroundColor: "black",
    marginBottom: 10,
    borderRadius: 13
  },
  gainerAndLoserCardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  gainerLoserFullName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  gainerLoserTicker: {
    color: "darkgray",
    fontWeight: "bold",
    fontSize: 13
  },
  gainerLoserPrice: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  gainerLoserPercent: {
    color: "lightgreen",
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

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(addSuccessNotification("Test"))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
