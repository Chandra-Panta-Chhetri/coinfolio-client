import React from "react";
import { useTheme, Switch } from "react-native-paper";
import SETTINGS_CONSTANTS from "../Constants";
import SettingGroup from "./SettingGroup";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  selectIsBiometricAuthOn,
  toggleBiometricAuth
} from "../../../redux/preferences";

const SecuritySettings = ({ isBiometricAuthOn, toggleBiometricAuth }) => {
  const { colors } = useTheme();
  const settingOptions = [
    {
      label: "Biometric authentication",
      iconComponent: (
        <FontAwesome5 name="fingerprint" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.BIOMETRIC_BACKGROUND_COLOR,
      endComponent: (
        <Switch
          color={colors.primary}
          value={isBiometricAuthOn}
          onValueChange={toggleBiometricAuth}
        />
      ),
      subheading: "Unlock with fingerprint or facial recognition"
    }
  ];

  return <SettingGroup heading="Security" settingOptions={settingOptions} />;
};

const mapStateToProps = (state) => ({
  isBiometricAuthOn: selectIsBiometricAuthOn(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleBiometricAuth: () => dispatch(toggleBiometricAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(SecuritySettings);
