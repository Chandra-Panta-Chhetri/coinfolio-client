import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { IconButton, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";
import SCREEN_NAMES from "../../../navigators/screen-names";

const SHORTCUT_ICONS = [
  {
    label: "Price Alerts",
    iconName: "bell-alert",
    navigateTo: SCREEN_NAMES.PRICE_ALERT
  },
  {
    label: "Compare",
    iconName: "compare",
    navigateTo: SCREEN_NAMES.COMPARE_CURRENCY
  },
  {
    label: "Convert",
    iconName: "calculator",
    navigateTo: SCREEN_NAMES.CONVERT_CURRENCY
  },
  {
    label: "Watchlist",
    iconName: "eye",
    navigateTo: SCREEN_NAMES.MARKET_OVERVIEW
  }
];

const ShortcutIcon = ({ iconInfo }) => {
  const navigation = useNavigation();
  const navigateToScreen = () => navigation.navigate(iconInfo?.navigateTo);
  const { colors, dark: isDarkMode } = useTheme();

  return (
    <TouchableRipple onPress={navigateToScreen} rippleColor={colors?.touchableRipple}>
      <View style={STYLES.iconContainer}>
        <View style={[STYLES.iconBtnContainer, { borderColor: isDarkMode ? colors?.border : colors?.card }]}>
          <IconButton icon={iconInfo?.iconName} iconColor={colors?.primary} />
        </View>
        <Text style={TYPOGRAPHY.body2}>{iconInfo?.label}</Text>
      </View>
    </TouchableRipple>
  );
};

const ShortcutIcons = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={STYLES.container}>
    {SHORTCUT_ICONS.map((si) => (
      <ShortcutIcon iconInfo={si} key={si?.label} />
    ))}
  </ScrollView>
);

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN,
    justifyContent: "space-between",
    flex: 1
  },
  iconContainer: {
    alignItems: "center",
    padding: 5
  },
  iconBtnContainer: {
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE,
    borderWidth: 5
  }
});

export default ShortcutIcons;
