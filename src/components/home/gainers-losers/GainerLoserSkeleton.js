import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import GlobalStyles from "../../../GlobalStyles";
import Skeleton from "../../shared/Skeleton";

const GainerLoserSkeleton = () => (
  <Card style={[styles.cardContainer, GlobalStyles.borderRadius]}>
    <Card.Content style={styles.cardBody}>
      <Skeleton style={[GlobalStyles.iconSize, GlobalStyles.iconRoundness]} />
      <View style={styles.infoContainer}>
        <View style={styles.rowFlexbox}>
          <Skeleton
            style={[styles.fullNamePriceSkeleton, GlobalStyles.borderRadius]}
          />
        </View>
        <View style={styles.rowFlexbox}>
          <Skeleton
            style={[styles.symbolPercentSkeleton, GlobalStyles.borderRadius]}
          />
        </View>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10
  },
  fullNamePriceSkeleton: {
    height: 15,
    flex: 1
  },
  symbolPercentSkeleton: {
    height: 15,
    marginTop: 10,
    flex: 1
  },
  rowFlexbox: {
    flexDirection: "row"
  }
});

export default GainerLoserSkeleton;
