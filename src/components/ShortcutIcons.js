import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { IconButton, Caption, TouchableRipple } from "react-native-paper";
import { withNavigation } from "@react-navigation/compat";

const shortcuts = [
  {
    label: "Price Alerts",
    iconName: "bell-alert",
    navigateTo: "News",
    iconColor: "blue"
  },
  {
    label: "Compare",
    iconName: "compare",
    navigateTo: "News",
    iconColor: "blue"
  },
  {
    label: "Converter",
    iconName: "calculator",
    navigateTo: "News",
    iconColor: "blue"
  },
  { label: "Watchlist", iconName: "eye", navigateTo: "News", iconColor: "blue" }
];

const ShortcutIcon = ({ item, navigation }) => {
  return (
    <TouchableRipple onPress={() => navigation.navigate(item.navigateTo)}>
      <View style={styles.shortcutIconItem}>
        <View style={styles.iconButton}>
          <IconButton icon={item.iconName} color={item.iconColor} />
        </View>
        <Caption style={styles.bold}>{item.label}</Caption>
      </View>
    </TouchableRipple>
  );
};

const ShortcutIcons = ({ navigation }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.shortcutIconContainer}
      keyExtractor={(sc) => sc.label}
      data={shortcuts}
      renderItem={(props) => (
        <ShortcutIcon navigation={navigation} {...props} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  },
  shortcutIconContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginTop: 10
  },
  shortcutIconItem: {
    alignItems: "center",
    padding: 5
  },
  iconButton: {
    borderWidth: 5,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ECECEC"
  }
});

export default withNavigation(ShortcutIcons);
