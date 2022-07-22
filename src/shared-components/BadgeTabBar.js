import React from "react";
import { GLOBAL_STYLES } from "../styles";
import { StyleSheet, ScrollView, View } from "react-native";
import Chip from "../shared-components/Chip";
import { GLOBAL_CONSTANTS } from "../constants";

const BadgeTabBar = ({ state, descriptors, navigation, containerStyles }) => {
  return (
    <View style={[STYLES.container, containerStyles]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[STYLES.tabs]}>
        {state.routes.map((route, i) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === i;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <Chip
              containerStyle={STYLES.tabContainer}
              key={i}
              accessibilityRole="button"
              onPress={onPress}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              label={label}
              isHighlighted={isFocused}
              Icon={options.tabBarIcon}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.screenContainer
  },
  tabs: {
    flexGrow: 1
  },
  tabContainer: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN,
    flexGrow: 1
  }
});

export default BadgeTabBar;
