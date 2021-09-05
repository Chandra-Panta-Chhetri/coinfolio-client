import React from "react";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store, persistor } from "./src/redux/store.js";
import { DarkTheme, DefaultTheme } from "./src/redux/preferences/theme.styles";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectIsThemeDark } from "./src/redux/preferences/preferences.selectors";
import NotificationSnackbar from "./src/components/shared/NotificationSnackbar";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ isThemeDark }) => {
  const theme = isThemeDark ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={theme.colors.card}
          barStyle={isThemeDark ? "light-content" : "dark-content"}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background
          }}
        >
          <NavigationContainer theme={theme}>
            <MainStackNavigator />
          </NavigationContainer>
        </View>
        <NotificationSnackbar />
      </SafeAreaView>
    </PaperProvider>
  );
};

const mapStateToProps = (state) => ({
  isThemeDark: selectIsThemeDark(state)
});

const AppWithState = connect(mapStateToProps)(App);

export default function () {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<Text>Loading App...</Text>} persistor={persistor}>
        <AppWithState />
      </PersistGate>
    </StoreProvider>
  );
}
