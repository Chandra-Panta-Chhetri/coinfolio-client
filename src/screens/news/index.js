import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LatestEventsScreen from "../latest-events";
import LatestNewsScreen from "../latest-news";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { View, StyleSheet } from "react-native";
import { Badge } from "../../shared-components";
import { Ionicons } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../constants";

const LatestNewsTabIcon = ({
  color,
  size = GLOBAL_CONSTANTS.TAB_ICON_SIZE
}) => <Ionicons name="newspaper-outline" size={size} color={color} />;

const LatestEventsTabIcon = ({
  color,
  size = GLOBAL_CONSTANTS.TAB_ICON_SIZE
}) => <Ionicons name="calendar-sharp" size={size} color={color} />;

const Tab = createMaterialTopTabNavigator();

const BadgeTabBar = ({ state, descriptors, navigation }) => {
  const numTabs = state.routes.length;

  return (
    <View style={STYLES.tabs}>
      {state.routes.map((route, i) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === i;

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tabContainerStyle = STYLES.tabContainer;
        if (numTabs === i + 1) {
          tabContainerStyle.marginRight = 0;
        }

        return (
          <Badge
            containerStyle={tabContainerStyle}
            key={i}
            accessibilityRole="button"
            onLongPress={onLongPress}
            onPress={onPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            label={label}
            isHighlighted={isFocused}
            icon={options.tabBarIcon}
          />
        );
      })}
    </View>
  );
};

const NewsScreen = () => (
  <Tab.Navigator
    screenOptions={{
      swipeEnabled: false,
      lazy: true,
      tabBarScrollEnabled: true
    }}
    tabBar={(props) => <BadgeTabBar {...props} />}
  >
    <Tab.Screen
      name="LatestNews"
      component={LatestNewsScreen}
      options={{
        title: "News",
        tabBarLabelStyle: TYPOGRAPHY.body1,
        tabBarIcon: LatestNewsTabIcon
      }}
    />
    <Tab.Screen
      name="LatestEvents"
      component={LatestEventsScreen}
      options={{
        title: "Events",
        tabBarLabelStyle: TYPOGRAPHY.body1,
        tabBarIcon: LatestEventsTabIcon
      }}
    />
  </Tab.Navigator>
);

const STYLES = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    ...GLOBAL_STYLES.screenContainer
  },
  tabContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    justifyContent: "center",
    marginRight: 10
  }
});

export default NewsScreen;
