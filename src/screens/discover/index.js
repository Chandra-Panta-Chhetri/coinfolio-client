import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventsScreen from "../events";
import NewsScreen from "../news";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { View, StyleSheet } from "react-native";
import { Badge } from "../../shared-components";
import { Ionicons } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../constants";
import { Text } from "react-native-paper";

const NewsTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <Ionicons name="newspaper-outline" size={size} color={color} />
);

const EventsTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <Ionicons name="calendar-sharp" size={size} color={color} />
);

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

const DiscoverScreen = () => (
  <>
    <Text style={STYLES.heading}>Discover</Text>
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        lazy: true,
        tabBarScrollEnabled: true
      }}
      tabBar={(props) => <BadgeTabBar {...props} />}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: "News",
          tabBarLabelStyle: TYPOGRAPHY.body1,
          tabBarIcon: NewsTabIcon
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: "Events",
          tabBarLabelStyle: TYPOGRAPHY.body1,
          tabBarIcon: EventsTabIcon
        }}
      />
    </Tab.Navigator>
  </>
);

const STYLES = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  },
  tabContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    justifyContent: "center",
    marginRight: 10
  },
  heading: {
    ...GLOBAL_STYLES.screenContainer,
    ...TYPOGRAPHY.display1,
    ...GLOBAL_STYLES.componentContainer,
    paddingBottom: 0
  }
});

export default DiscoverScreen;
