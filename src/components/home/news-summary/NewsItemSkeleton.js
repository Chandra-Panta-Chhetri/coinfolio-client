import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import GlobalStyles from "../../../GlobalStyles";
import Skeleton from "../../shared/Skeleton";

const NewsItemSkeleton = () => (
  <Card style={[styles.cardContainer, GlobalStyles.borderRadius]}>
    <Card.Content style={styles.cardBody}>
      <View style={styles.infoContainer}>
        <View style={styles.rowFlexbox}>
          <Skeleton style={[styles.titleSkeleton, GlobalStyles.borderRadius]} />
        </View>
        <Skeleton
          style={[styles.subheadingSkeleton, GlobalStyles.borderRadius]}
        />
      </View>
      <Skeleton
        style={[GlobalStyles.imagePreview, GlobalStyles.borderRadius]}
      />
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContainer: {
    marginTop: 10
  },
  infoContainer: {
    flex: 1,
    marginRight: 15
  },
  titleSkeleton: {
    height: 25,
    flex: 1
  },
  subheadingSkeleton: {
    height: 20,
    marginTop: 10,
    width: 100
  },
  rowFlexbox: {
    flexDirection: "row"
  }
});

export default NewsItemSkeleton;
