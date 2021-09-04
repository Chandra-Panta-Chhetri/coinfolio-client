import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LatestNewsScreen from "../screens/LatestNewsScreen";
import LatestEventsScreen from "../screens/LatestEventsScreen";
import GlobalStyles from "../GlobalStyles";
import { View, Text, StyleSheet } from "react-native";
import PressableView from "../components/shared/PressableView";
import { useTheme } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

const BadgeTabBar = ({ state, descriptors, navigation }) => {
  const { colors, dark: isDarkMode } = useTheme();
  const numTabs = state.routes.length;

  return (
    <View
      style={[
        GlobalStyles.screenContainer,
        GlobalStyles.componentContainer,
        styles.tabs
      ]}
    >
      {state.routes.map((route, i) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const activeStyles = {
          backgroundColor: isDarkMode ? colors.text : colors.primary,
          color: isDarkMode ? colors.border : "white"
        };

        const inactiveStyles = {
          color: colors.text,
          backgroundColor: isDarkMode ? colors.border : "lightgrey"
        };

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

        return (
          <PressableView
            key={i}
            viewStyle={[
              styles.tabContainer,
              GlobalStyles.iconRoundness,
              isFocused ? activeStyles : inactiveStyles,
              numTabs === i + 1 && { marginRight: 0 }
            ]}
            accessibilityRole="button"
            onLongPress={onLongPress}
            onPress={onPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <Text
              style={[
                GlobalStyles.subheading,
                {
                  color: isFocused ? activeStyles.color : inactiveStyles.color
                }
              ]}
            >
              {label}
            </Text>
          </PressableView>
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
        title: "Latest News",
        tabBarLabelStyle: GlobalStyles.body1
      }}
    />
    <Tab.Screen
      name="LatestEvents"
      component={LatestEventsScreen}
      options={{
        title: "Latest Events",
        tabBarLabelStyle: GlobalStyles.body1
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    paddingBottom: 0
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
