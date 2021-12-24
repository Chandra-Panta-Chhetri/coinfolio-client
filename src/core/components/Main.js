import React from "react";
import RootNavigator from "../navigators/Root";
import { Provider as PaperProvider } from "react-native-paper";
import { THEME } from "../../styles";
import { Platform, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectIsThemeDark } from "../../redux/preferences/preferences.selectors";
import NotificationSnackbar from "./NotificationSnackbar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

const Main = ({ isThemeDark }) => {
  const theme = isThemeDark ? THEME.DARK : THEME.LIGHT;
  const containerStyles = { flex: 1, backgroundColor: theme.colors.card };

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(theme.colors.card);
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={containerStyles}>
        <StatusBar backgroundColor={theme.colors.card} style={isThemeDark ? "light" : "dark"} />
        <GestureHandlerRootView style={[containerStyles, { marginTop: 40 }]}>
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

const mapStateToProps = (state) => ({
  isThemeDark: selectIsThemeDark(state)
});

export default connect(mapStateToProps)(Main);
