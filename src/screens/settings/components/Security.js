import React from "react";
import { useTheme, Switch } from "react-native-paper";
import SETTINGS_CONSTANTS from "../constants";
import Category from "./Category";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { selectIsAuthEnabled, toggleAuth } from "../../../redux/preferences";

const Security = ({ isAuthEnabled, toggleAuth }) => {
  const { colors } = useTheme();
  const options = [
    {
      label: "Biometric authentication",
      iconComponent: <FontAwesome5 name="fingerprint" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.BIOMETRIC_BACKGROUND_COLOR,
      endComponent: <Switch color={colors?.primary} value={isAuthEnabled} onValueChange={toggleAuth} />,
      subheading: "Unlock with fingerprint or facial recognition"
    }
  ];

  return <Category heading="Security" options={options} />;
};

const mapStateToProps = (state) => ({
  isAuthEnabled: selectIsAuthEnabled(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleAuth: () => dispatch(toggleAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(Security);
