import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { Text } from "react-native-paper";
import SettingItem from "./SettingItem";

const SettingGroup = ({
  settingOptions = [],
  heading = "",
  includeContainerStyle = true
}) => (
  <View style={includeContainerStyle && GLOBAL_STYLES.componentContainer}>
    <Text style={styles.heading}>{heading}</Text>
    {settingOptions.map((settingOption) => (
      <SettingItem key={settingOption.label} {...settingOption} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  heading: { ...TYPOGRAPHY.title, fontWeight: "normal" }
});

export default SettingGroup;
