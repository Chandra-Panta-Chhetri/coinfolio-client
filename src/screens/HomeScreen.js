import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { selectNotifications } from "../redux/notification/notification.selectors";
import { createStructuredSelector } from "reselect";
import { addSuccessNotification } from "../redux/notification/notification.actions";
import {
  Card,
  Paragraph,
  Caption,
  Headline,
  Avatar,
  Button
} from "react-native-paper";
import GlobalMarketSummary from "../components/GlobalMarketSummary";
import ShortcutIcons from "../components/ShortcutIcons";

function HomeScreen({ navigation }) {
  useEffect(() => {}, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <GlobalMarketSummary />
      <ShortcutIcons />
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
  bold: {
    fontWeight: "bold"
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
  }
});

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(addSuccessNotification("Test"))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
