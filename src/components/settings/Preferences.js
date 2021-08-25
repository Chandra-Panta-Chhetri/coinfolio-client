import React from "react";
import { connect } from "react-redux";
import {
  selectCurrencyCode,
  selectIsNotificationsOn,
  selectIsPrivacyModeOn,
  selectIsThemeDark,
  selectHomeScreen
} from "../../redux/preferences/preferences.selectors";
import {
  toggleNotifications,
  togglePrivacyMode,
  toggleTheme
} from "../../redux/preferences/preferences.actions";
import { withNavigation } from "@react-navigation/compat";
import { compose } from "redux";
import { Switch, useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CONSTANTS from "../../Constants";
import { createStructuredSelector } from "reselect";
import MoreOptions from "../shared/MoreOptions";
import SettingGroup from "./SettingGroup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Preferences = ({
  isDarkMode,
  toggleDarkMode,
  toggleNotifications,
  isNotificationsOn,
  currencyCode,
  homeScreen,
  navigation,
  togglePrivacyMode,
  isPrivacyModeOn
}) => {
  const { colors } = useTheme();
  const settingOptions = [
    {
      label: "Dark mode",
      iconComponent: (
        <Ionicons name="moon" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.DARK_MODE_BACKGROUND_COLOR,
      endComponent: (
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          color={colors.primary}
        />
      )
    },
    {
      label: "Receive notifications",
      iconComponent: (
        <Ionicons name="notifications" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor:
        CONSTANTS.SETTINGS.RECEIVE_NOTIFICATIONS_BACKGROUND_COLOR,
      endComponent: (
        <Switch
          value={isNotificationsOn}
          onValueChange={toggleNotifications}
          color={colors.primary}
        />
      )
    },
    {
      label: "Currency",
      iconComponent: (
        <FontAwesome5
          name="money-bill-alt"
          size={CONSTANTS.SETTINGS.ICON_SIZE}
        />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.CURRENCY_BACKGROUND_COLOR,
      endComponent: <MoreOptions selectedOption={currencyCode} />,
      onPress: () => navigation.navigate("SelectCurrency")
    },
    {
      label: "Home Screen",
      iconComponent: (
        <AntDesign name="home" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.HOME_SCREEN_BACKGROUND_COLOR,
      endComponent: <MoreOptions selectedOption={homeScreen} />,
      subheading:
        "Change the screen that initially shows up once app starts up",
      onPress: () => navigation.navigate("SelectHomeScreen")
    },
    {
      label: "Privacy Mode",
      iconComponent: (
        <MaterialCommunityIcons
          name="shield-lock"
          size={CONSTANTS.SETTINGS.ICON_SIZE}
        />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.PRIVACY_MODE_BACKGROUND_COLOR,
      endComponent: (
        <Switch
          value={isPrivacyModeOn}
          onValueChange={togglePrivacyMode}
          color={colors.primary}
        />
      ),
      subheading: "Hide or show values in your portfolio"
    }
  ];

  return <SettingGroup heading="Preferences" settingOptions={settingOptions} />;
};

const mapStateToProps = createStructuredSelector({
  isDarkMode: selectIsThemeDark,
  isNotificationsOn: selectIsNotificationsOn,
  currencyCode: selectCurrencyCode,
  homeScreen: selectHomeScreen,
  isPrivacyModeOn: selectIsPrivacyModeOn
});

const mapDispatchToProps = (dispatch) => ({
  toggleDarkMode: () => dispatch(toggleTheme()),
  toggleNotifications: () => dispatch(toggleNotifications()),
  togglePrivacyMode: () => dispatch(togglePrivacyMode())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(Preferences);
