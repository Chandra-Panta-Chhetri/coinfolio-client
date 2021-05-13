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
  Avatar,
  Button
} from "react-native-paper";

function HomeScreen({ navigation }) {
  useEffect(() => {}, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.globalSummaryCard}>
        <Card.Content>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.globalSummaryItem}>
              <Paragraph style={styles.globalSummaryLabel}>
                Market Cap:{" "}
              </Paragraph>
              <Paragraph style={styles.globalSummaryValue}>
                $3,026,234,553,628
              </Paragraph>
            </View>
            <View style={styles.globalSummaryItem}>
              <Paragraph style={styles.globalSummaryLabel}>24h Vol: </Paragraph>
              <Paragraph style={styles.globalSummaryValue}>
                $286,423,453,955
              </Paragraph>
            </View>
            <View style={styles.globalSummaryItem}>
              <Paragraph style={styles.globalSummaryLabel}>
                BTC Dominance:{" "}
              </Paragraph>
              <Paragraph style={styles.globalSummaryValue}>42.4%</Paragraph>
            </View>
            <View style={styles.globalSummaryItem}>
              <Paragraph style={styles.globalSummaryLabel}>
                ETH Dominance:{" "}
              </Paragraph>
              <Paragraph style={styles.globalSummaryValue}>19.4%</Paragraph>
            </View>
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
        <View style={styles.sectionHeadingContainer}>
          <Headline style={styles.bold}>Top Coins</Headline>
          <Button
            compact
            uppercase={false}
            labelStyle={styles.seeAllButton}
            onPress={() => {}}
          >
            See All
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topMoversContainer}
        >
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeadingContainer}>
          <Headline style={styles.bold}>Gainers & Losers</Headline>
          <Button
            compact
            uppercase={false}
            labelStyle={styles.seeAllButton}
            onPress={() => {}}
          >
            See All
          </Button>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gainerAndLoserContainer}
        >
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
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
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeadingContainer}>
          <Headline style={styles.bold}>News</Headline>
          <Button
            compact
            uppercase={false}
            labelStyle={styles.seeAllButton}
            onPress={() => {}}
          >
            See All
          </Button>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.newsContainer}
        >
          <TouchableOpacity activeOpacity={0.6}>
            <Card style={styles.newsItemCard}>
              <Card.Content style={styles.newsItemCardBody}>
                <View style={styles.newsInfo}>
                  <Paragraph style={styles.newsTitle}>
                    Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto
                    about-face
                  </Paragraph>
                  <Caption style={styles.newsSubtitle}>
                    3h ago | CBC News
                  </Caption>
                </View>
                <Card.Cover
                  style={styles.newsImage}
                  source={{
                    uri: "https://sm.mashable.com/t/mashable_in/feature/d/dogecoin-e/dogecoin-everything-you-need-to-know-about-the-cryptocurrenc_4ssb.h1280.jpg"
                  }}
                />
              </Card.Content>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}>
            <Card style={styles.newsItemCard}>
              <Card.Content style={styles.newsItemCardBody}>
                <View style={styles.newsInfo}>
                  <Paragraph style={styles.newsTitle}>
                    Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto
                    about-face
                  </Paragraph>
                  <Caption style={styles.newsSubtitle}>
                    3h ago | CBC News
                  </Caption>
                </View>
                <Card.Cover
                  style={styles.newsImage}
                  source={{
                    uri: "https://sm.mashable.com/t/mashable_in/feature/d/dogecoin-e/dogecoin-everything-you-need-to-know-about-the-cryptocurrenc_4ssb.h1280.jpg"
                  }}
                />
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  globalSummaryItem: {
    marginRight: 10,
    flexDirection: "row"
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
  },
  newsContainer: {
    marginTop: 10
  },
  newsItemCardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newsItemCard: {
    marginBottom: 10,
    backgroundColor: "black",
    borderRadius: 13
  },
  newsTitle: {
    color: "white",
    fontSize: 15
  },
  newsSubtitle: {
    color: "darkgray",
    fontWeight: "bold"
  },
  newsInfo: {
    flex: 1
  },
  newsImage: {
    width: 100,
    height: 100
  },
  sectionHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  seeAllButton: {
    fontWeight: "bold",
    color: "blue"
  },
  globalSummaryCard: {
    backgroundColor: "black"
  },
  globalSummaryLabel: {
    color: "white",
    fontWeight: "bold"
  },
  globalSummaryValue: {
    color: "darkgray"
  }
});

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(addSuccessNotification("Test"))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
