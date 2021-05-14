import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const GlobalMarketSummary = () => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>Market Cap: </Paragraph>
            <Paragraph style={styles.summaryValue}>
              $3,026,234,553,628
            </Paragraph>
          </View>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>24h Vol: </Paragraph>
            <Paragraph style={styles.summaryValue}>$286,423,453,955</Paragraph>
          </View>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>BTC Dominance: </Paragraph>
            <Paragraph style={styles.summaryValue}>42.4%</Paragraph>
          </View>
          <View style={styles.summaryItem}>
            <Paragraph style={styles.summaryLabel}>ETH Dominance: </Paragraph>
            <Paragraph style={styles.summaryValue}>19.4%</Paragraph>
          </View>
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  summaryItem: {
    marginRight: 10,
    flexDirection: "row"
  },
  container: {
    backgroundColor: "black"
  },
  summaryLabel: {
    color: "white",
    fontWeight: "bold"
  },
  summaryValue: {
    color: "darkgray"
  }
});

export default GlobalMarketSummary;
