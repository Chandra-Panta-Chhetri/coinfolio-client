import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { IconButton, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const SHORTCUT_ICONS = [
  {
    label: "Price Alerts",
    iconName: "bell-alert",
    navigateTo: "PriceAlert"
  },
  {
    label: "Compare",
    iconName: "compare",
    navigateTo: "CompareCurrency"
  },
  {
    label: "Convert",
    iconName: "calculator",
    navigateTo: "ConvertCurrency"
  },
  {
    label: "Watchlist",
    iconName: "eye",
    navigateTo: "MarketOverview"
  }
];

const ShortcutIcon = ({ iconInfo }) => {
  const navigation = useNavigation();
  const navigateToScreen = () => navigation.navigate(iconInfo.navigateTo);
  const { colors, dark: isDarkMode } = useTheme();

  return (
    <TouchableRipple onPress={navigateToScreen} rippleColor={colors.touchableRipple}>
      <View style={STYLES.iconContainer}>
        <View style={[STYLES.iconBtnContainer, { borderColor: isDarkMode ? colors.border : colors.card }]}>
          <IconButton icon={iconInfo.iconName} color={colors.primary} />
        </View>
        <Text style={TYPOGRAPHY.body2}>{iconInfo.label}</Text>
      </View>
    </TouchableRipple>
  );
};

const ShortcutIcons = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={STYLES.container}>
    {SHORTCUT_ICONS.map((si) => (
      <ShortcutIcon iconInfo={si} key={si.label} />
    ))}
  </ScrollView>
);

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.componentContainer,
    justifyContent: "space-between",
    flex: 1
  },
  iconContainer: {
    alignItems: "center",
    padding: 5
  },
  iconBtnContainer: {
    ...GLOBAL_STYLES.iconRoundness,
    borderWidth: 5
  }
});

export default ShortcutIcons;
