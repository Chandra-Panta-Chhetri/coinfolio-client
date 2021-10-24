import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  IconButton,
  Caption,
  TouchableRipple,
  useTheme
} from "react-native-paper";
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

const ShortcutIcon = ({ item }) => {
  const navigation = useNavigation();
  const navigateToScreen = () => navigation.navigate(item.navigateTo);
  const { colors, dark: isDarkMode } = useTheme();

  return (
    <TouchableRipple
      onPress={navigateToScreen}
      rippleColor={colors.touchableRipple}
    >
      <View style={STYLES.shortcutIconItem}>
        <View
          style={[
            STYLES.iconButton,
            { borderColor: isDarkMode ? colors.border : colors.card }
          ]}
        >
          <IconButton icon={item.iconName} color={colors.primary} />
        </View>
        <Caption style={TYPOGRAPHY.body2}>{item.label}</Caption>
      </View>
    </TouchableRipple>
  );
};

const ShortcutIcons = ({ navigation }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={STYLES.shortcutIconContainer}
    keyExtractor={(sc) => sc.label}
    data={SHORTCUT_ICONS}
    renderItem={(props) => <ShortcutIcon navigation={navigation} {...props} />}
    listKey="ShortcutIconsList"
  />
);

const STYLES = StyleSheet.create({
  shortcutIconContainer: {
    ...GLOBAL_STYLES.componentContainer,
    justifyContent: "space-between",
    flex: 1
  },
  shortcutIconItem: {
    alignItems: "center",
    padding: 5
  },
  iconButton: {
    ...GLOBAL_STYLES.iconRoundness,
    borderWidth: 5
  }
});

export default ShortcutIcons;
