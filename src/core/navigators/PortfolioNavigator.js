import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { selectIsUserAuthenticated } from "../../redux/user";
import { PortfolioUnauthenticated } from "../../screens";
import PortfolioDrawer from "./PortfolioDrawer";

const Stack = createStackNavigator();

function PortfolioNavigator({ isAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="PortfolioDrawer" component={PortfolioDrawer} />
      ) : (
        <Stack.Screen name="PortfolioUnauthenticated" component={PortfolioUnauthenticated} />
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsUserAuthenticated(state)
});

export default connect(mapStateToProps)(PortfolioNavigator);
