import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { IconButton, Caption, TouchableRipple } from "react-native-paper";
import { withNavigation } from "@react-navigation/compat";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const ShortcutIcon = ({ item, navigation }) => {
  const navigateToScreen = () => navigation.navigate(item.navigateTo);

  return (
    <TouchableRipple onPress={navigateToScreen}>
      <View style={styles.shortcutIconItem}>
        <View style={[styles.iconButton, GlobalStyles.iconRoundness]}>
          <IconButton icon={item.iconName} color={item.iconColor} />
        </View>
        <Caption style={[GlobalStyles.body2]}>{item.label}</Caption>
      </View>
    </TouchableRipple>
  );
};

const ShortcutIcons = ({ navigation }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.shortcutIconContainer,
        GlobalStyles.componentContainer
      ]}
      keyExtractor={(sc) => sc.label}
      data={CONSTANTS.SHORTCUT_ICONS}
      renderItem={(props) => (
        <ShortcutIcon navigation={navigation} {...props} />
      )}
      listKey="ShortcutIconsList"
    />
  );
};

const styles = StyleSheet.create({
  shortcutIconContainer: {
    justifyContent: "space-between",
    flex: 1
  },
  shortcutIconItem: {
    alignItems: "center",
    padding: 5
  },
  iconButton: {
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#ECECEC"
  }
});

export default withNavigation(ShortcutIcons);
