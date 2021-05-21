import React from "react";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/redux/store.js";
import { DarkTheme, DefaultTheme } from "./src/redux/preferences/theme.styles";
import SafeAreaAndroidStyles from "./src/GlobalStyles";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectIsThemeDark } from "./src/redux/preferences/preferences.selectors";
import NotificationSnackbar from "./src/components/NotificationSnackbar";

const App = ({ isThemeDark }) => (
  <PaperProvider theme={isThemeDark ? DarkTheme : DefaultTheme}>
    <SafeAreaView style={SafeAreaAndroidStyles.AndroidSafeArea}>
      <StatusBar />
      <NavigationContainer theme={isThemeDark ? DarkTheme : DefaultTheme}>
        <MainStackNavigator />
      </NavigationContainer>
      <NotificationSnackbar />
    </SafeAreaView>
  </PaperProvider>
);

const mapStateToProps = (state) => ({
  isThemeDark: selectIsThemeDark(state)
});

const AppWithState = connect(mapStateToProps)(App);

export default function () {
  return (
    <StoreProvider store={store}>
      <AppWithState />
    </StoreProvider>
  );
}
