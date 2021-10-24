import React from "react";
import RootNavigator from "../navigators/Root";
import { Provider as PaperProvider } from "react-native-paper";
import { THEME } from "../../styles";
import { SafeAreaView, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { selectIsThemeDark } from "../../redux/preferences/preferences.selectors";
import NotificationSnackbar from "./NotificationSnackbar";

const Main = ({ isThemeDark }) => {
  const theme = isThemeDark ? THEME.DARK : THEME.LIGHT;
  const containerStyles = { flex: 1, backgroundColor: theme.colors.card };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={containerStyles}>
        <StatusBar
          backgroundColor={theme.colors.card}
          barStyle={isThemeDark ? "light-content" : "dark-content"}
        />
        <View style={containerStyles}>
          <NavigationContainer theme={theme}>
            <RootNavigator />
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

export default connect(mapStateToProps)(Main);
