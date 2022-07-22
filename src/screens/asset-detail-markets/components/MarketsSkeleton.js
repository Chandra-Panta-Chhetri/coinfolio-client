import React from "react";
import { Skeleton } from "../../../shared-components";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES } from "../../../styles";

const MarketsSkeleton = () => (
  <View style={STYLES.container}>
    <Skeleton style={STYLES.table} />
  </View>
);

const STYLES = StyleSheet.create({
  container: { ...GLOBAL_STYLES.screenContainer, paddingVertical: 0 },
  table: { height: "99%" }
});

export default MarketsSkeleton;
