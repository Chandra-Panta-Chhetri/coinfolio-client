import React from "react";
import { useTheme, Switch } from "react-native-paper";
import CONSTANTS from "../../Constants";
import SettingGroup from "./SettingGroup";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { selectIsBiometricAuthOn } from "../../redux/preferences/preferences.selectors";
import { toggleBiometricAuth } from "../../redux/preferences/preferences.actions";

const Security = ({ isBiometricAuthOn, toggleBiometricAuth }) => {
  const { colors } = useTheme();
  const settingOptions = [
    {
      label: "Biometric authentication",
      iconComponent: (
        <FontAwesome5 name="fingerprint" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.BIOMETRIC_BACKGROUND_COLOR,
      endComponent: (
        <Switch
          color={colors.primary}
          value={isBiometricAuthOn}
          onValueChange={toggleBiometricAuth}
        />
      ),
      subheading: "Unlock app with fingerprint or facial recognition"
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

export default connect(mapStateToProps, mapDispatchToProps)(Security);
