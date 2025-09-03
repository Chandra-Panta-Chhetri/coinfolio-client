import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import { selectIsAuthenticated } from "../redux/user";
import { PortfolioUnauthenticatedScreen } from "../screens";
import PortfolioDrawer from "./PortfolioDrawer";
import SCREEN_NAMES from "./screen-names";

const Stack = createStackNavigator();

const PortfolioNavigator = ({ isAuthenticated }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name={SCREEN_NAMES.PORTFOLIO_DRAWER} component={PortfolioDrawer} />
      ) : (
        <Stack.Screen name={SCREEN_NAMES.PORTFOLIO_UNAUTHENTICATED} component={PortfolioUnauthenticatedScreen} />
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state)
});

export default connect(mapStateToProps)(PortfolioNavigator);
