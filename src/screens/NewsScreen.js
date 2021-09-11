import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LatestNewsScreen from "../screens/LatestNewsScreen";
import LatestEventsScreen from "../screens/LatestEventsScreen";
import GlobalStyles from "../GlobalStyles";
import { View, StyleSheet } from "react-native";
import Badge from "../components/shared/Badge";
import { Ionicons } from "@expo/vector-icons";
import CONSTANTS from "../Constants";

const LatestNewsTabIcon = ({
  color,
  size = CONSTANTS.SHARED.TAB_ICON_SIZE
}) => <Ionicons name="newspaper-outline" size={size} color={color} />;

const LatestEventsTabIcon = ({
  color,
  size = CONSTANTS.SHARED.TAB_ICON_SIZE
}) => <Ionicons name="calendar-sharp" size={size} color={color} />;

const Tab = createMaterialTopTabNavigator();

const BadgeTabBar = ({ state, descriptors, navigation }) => {
  const numTabs = state.routes.length;

  return (
    <View style={[GlobalStyles.screenContainer, styles.tabs]}>
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

        const tabContainerStyle = styles.tabContainer;
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
            isActive={isFocused}
            icon={options.tabBarIcon}
          />
        );
      })}
    </View>
  );
};

const NewsScreen = () => (
  <Tab.Navigator
    initialRouteName="LatestNews"
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
        tabBarLabelStyle: GlobalStyles.body1,
        tabBarIcon: LatestNewsTabIcon
      }}
    />
    <Tab.Screen
      name="LatestEvents"
      component={LatestEventsScreen}
      options={{
        title: "Events",
        tabBarLabelStyle: GlobalStyles.body1,
        tabBarIcon: LatestEventsTabIcon
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row"
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
