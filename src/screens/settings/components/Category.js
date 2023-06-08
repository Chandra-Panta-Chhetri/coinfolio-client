import React from "react";
import { StyleSheet, View } from "react-native";
import { TYPOGRAPHY } from "../../../styles";
import { Text } from "react-native-paper";
import Setting from "./Setting";
import { GLOBAL_CONSTANTS } from "../../../constants";

const Category = ({ options, heading, includeContainerStyle = true }) => (
  <View style={includeContainerStyle ? STYLES.container : null}>
    <Text style={STYLES.heading}>{heading}</Text>
    {(options ?? []).map((option) => (
      <Setting key={option?.label} {...option} />
    ))}
  </View>
);

const STYLES = StyleSheet.create({
  heading: { ...TYPOGRAPHY.title },
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

export default Category;
