import React from "react";
import { StyleSheet, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import { Headline } from "react-native-paper";
import SettingOption from "../shared/SettingOption";

const SettingGroup = ({
  settingOptions = [],
  heading = "",
  includeComponentContainerStyle = true
}) => (
  <View
    style={includeComponentContainerStyle && GlobalStyles.componentContainer}
  >
    <Headline style={[GlobalStyles.title, styles.heading]}>{heading}</Headline>
    {settingOptions.map((settingOption) => (
      <SettingOption key={settingOption.label} {...settingOption} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  heading: { fontWeight: "normal" }
});

export default SettingGroup;
