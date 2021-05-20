import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";

const TopCoinCardSkeleton = () => {
  return (
    <Card style={styles.topCoinCard}>
      <Card.Content>
        <SkeletonPlaceholder
          highlightColor="rgb(10, 132, 255)"
          backgroundColor="gainsboro"
        >
          <SkeletonPlaceholder.Item borderRadius={30} width={30} height={30} />
          <SkeletonPlaceholder.Item
            borderRadius={13}
            width="50%"
            height={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            borderRadius={13}
            width="100%"
            height={10}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            borderRadius={13}
            width="100%"
            height={10}
            marginTop={10}
          />
        </SkeletonPlaceholder>
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
