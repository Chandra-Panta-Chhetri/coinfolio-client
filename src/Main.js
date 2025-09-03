import React, { useEffect } from "react";
import RootNavigator from "./navigators/Root";
import { Provider as PaperProvider } from "react-native-paper";
import { THEME } from "./styles";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectIsThemeDark } from "./redux/preferences";
import { NotificationSnackbar } from "./components";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { DEVICE_TYPES } from "./constants";

const Main = ({ isThemeDark }) => {
  const theme = isThemeDark ? THEME.DARK : THEME.LIGHT;
  const statusBarStyle = isThemeDark ? "light" : "dark";

  useEffect(() => {
    if (Platform.OS === DEVICE_TYPES.ANDROID) {
      NavigationBar.setBackgroundColorAsync(theme?.colors?.card);
    }
  }, [theme]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={[STYLES.safeAreaView, { backgroundColor: theme?.colors?.card }]}>
        <StatusBar backgroundColor={theme?.colors?.card} style={statusBarStyle} />
        <GestureHandlerRootView style={[STYLES.gestureHandlerRoot, { backgroundColor: theme?.colors?.card }]}>
          <NavigationContainer theme={theme}>
            <BottomSheetModalProvider>
              <RootNavigator />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
        <NotificationSnackbar />
      </SafeAreaView>
    </PaperProvider>
  );
};

const STYLES = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  gestureHandlerRoot: {
    marginTop: 40,
    flex: 1
  }
});

const mapStateToProps = (state) => ({
  isThemeDark: selectIsThemeDark(state)
});

export default connect(mapStateToProps)(Main);
