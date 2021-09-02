import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  IconButton,
  Caption,
  TouchableRipple,
  useTheme
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const ShortcutIcon = ({ item }) => {
  const navigation = useNavigation();
  const navigateToScreen = () => navigation.navigate(item.navigateTo);
  const { colors, dark: isDarkMode } = useTheme();

  return (
    <TouchableRipple
      onPress={navigateToScreen}
      rippleColor={colors.touchableRipple}
    >
      <View style={styles.shortcutIconItem}>
        <View
          style={[
            styles.iconButton,
            GlobalStyles.iconRoundness,
            { borderColor: isDarkMode ? colors.border : colors.card }
          ]}
        >
          <IconButton icon={item.iconName} color={colors.primary} />
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
    borderWidth: 5
  }
});

export default ShortcutIcons;
