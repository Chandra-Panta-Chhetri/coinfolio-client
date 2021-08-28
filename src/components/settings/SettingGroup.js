import React from "react";
import { StyleSheet, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { Text } from "react-native-paper";
import SettingOption from "../shared/SettingOption";

const SettingGroup = ({
  settingOptions = [],
  heading = "",
  includeComponentContainerStyle = true
}) => (
  <View
    style={includeComponentContainerStyle && GlobalStyles.componentContainer}
  >
    <Text style={[GlobalStyles.title, styles.heading]}>{heading}</Text>
    {settingOptions.map((settingOption) => (
      <SettingOption key={settingOption.label} {...settingOption} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  heading: { fontWeight: "normal" }
});

export default SettingGroup;
