import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const TopCoinCardSkeleton = () => {
  return (
    <Card style={styles.topCoinCard}>
      <Card.Content>
        <ShimmerPlaceholder
          style={{ borderRadius: 30, width: 30, height: 30 }}
          shimmerColors={["gainsboro", "#f8f8f8", "gainsboro"]}
        />
        <ShimmerPlaceholder
          style={{ borderRadius: 13, width: 50, height: 10, marginTop: 10 }}
        />
        <ShimmerPlaceholder
          style={{ borderRadius: 13, width: 100, height: 10, marginTop: 10 }}
        />
        <ShimmerPlaceholder
          style={{ borderRadius: 13, width: 100, height: 10, marginTop: 10 }}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  topCoinCard: {
    marginRight: 10,
    borderRadius: 13,
    width: 125
  }
});

export default TopCoinCardSkeleton;
