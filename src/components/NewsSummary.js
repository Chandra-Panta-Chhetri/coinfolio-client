import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Card, Paragraph, Caption } from "react-native-paper";
import HeadingWithSeeAll from "./HeadingWithSeeAll";
import { withNavigation } from "@react-navigation/compat";

const dummyData = [
  {
    title:
      "Dogecoin falls 15% to below 40 cents on Elon Musk’s crypto about-face",
    publishedTime: "3h ago",
    source: "CBC News",
    imagePreview: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
  },
  {
    title: "Ethereum’s Ratio Overtakes Resistance",
    publishedTime: "10h ago",
    source: "Trustnodes",
    imagePreview:
      "https://www.trustnodes.com/wp-content/uploads/2021/05/xethereum-ratio-bitcoin-price-may-14-2021.png.pagespeed.ic.e_g1OTbZRR.webp"
  },
  {
    title: "Will Musk Buy ETH?",
    publishedTime: "1h ago",
    source: "Trustnodes",
    imagePreview:
      "https://www.trustnodes.com/wp-content/uploads/2021/05/xelon-musk.jpg.pagespeed.ic.jLiFCP5v7B.webp"
  }
];

const NewsItem = ({ item, navigation }) => (
  <TouchableOpacity activeOpacity={0.6}>
    <Card style={styles.newsCard}>
      <Card.Content style={styles.newsCardBody}>
        <View style={styles.newsInfo}>
          <Paragraph style={styles.newsTitle}>{item.title}</Paragraph>
          <Caption style={styles.newsSubtitle}>
            {item.publishedTime} | {item.source}
          </Caption>
        </View>
        <Card.Cover
          style={styles.newsImagePreview}
          source={{
            uri: item.imagePreview
          }}
        />
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

const NewsSummary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeadingWithSeeAll headingTitle="News" onSeeAllBtnPress={() => {}} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.newsContainer}
        data={dummyData}
        keyExtractor={(n) => n.title}
        renderItem={(props) => <NewsItem {...props} navigation={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  newsContainer: {
    marginTop: 10
  },
  newsCardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newsCard: {
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
  newsImagePreview: {
    width: 90,
    height: 90
  }
});

export default withNavigation(NewsSummary);
