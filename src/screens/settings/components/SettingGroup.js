import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { Text } from "react-native-paper";
import SettingItem from "./SettingItem";
import { GLOBAL_CONSTANTS } from "../../../constants";

const SettingGroup = ({ settingOptions = [], heading = "", includeContainerStyle = true }) => (
  <View style={includeContainerStyle ? STYLES.container : undefined}>
    <Text style={STYLES.heading}>{heading}</Text>
    {settingOptions.map((settingOption) => (
      <SettingItem key={settingOption.label} {...settingOption} />
    ))}
  </View>
);

const STYLES = StyleSheet.create({
  heading: { ...TYPOGRAPHY.title },
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

export default SettingGroup;
