import React from "react";
import { connect } from "react-redux";
import {
  selectCurrencyCode,
  selectIsNotificationsEnabled,
  selectIsPrivacyModeEnabled,
  selectIsThemeDark,
  selectInitialScreen,
  toggleNotifications,
  togglePrivacyMode,
  toggleTheme
} from "../../../redux/preferences";
import { useNavigation } from "@react-navigation/native";
import { Switch, useTheme } from "react-native-paper";
import { FontAwesome5, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import SETTINGS_CONSTANTS from "../constants";
import { createStructuredSelector } from "reselect";
import MoreOptionsIndicator from "./MoreOptionsIndicator";
import Category from "./Category";
import SCREEN_NAMES from "../../../navigators/screen-names";

const Preferences = ({
  isDarkMode,
  toggleDarkMode,
  toggleNotifications,
  isNotificationsEnabled,
  currencyCode,
  initialScreen,
  togglePrivacyMode,
  isPrivacyModeEnabled
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const options = [
    {
      label: "Dark mode",
      iconComponent: <Ionicons name="moon" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.DARK_MODE_BACKGROUND_COLOR,
      endComponent: <Switch value={isDarkMode} onValueChange={toggleDarkMode} color={colors?.primary} />
    },
    {
      label: "Receive notifications",
      iconComponent: <Ionicons name="notifications" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.RECEIVE_NOTIFICATIONS_BACKGROUND_COLOR,
      endComponent: (
        <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} color={colors?.primary} />
      )
    },
    {
      label: "Currency",
      iconComponent: <FontAwesome5 name="money-bill-alt" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.CURRENCY_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator selectedOptionLabel={currencyCode} />,
      onPress: () => navigation?.navigate(SCREEN_NAMES.SELECT_CURRENCY)
    },
    {
      label: "Home screen",
      iconComponent: <AntDesign name="home" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.HOME_SCREEN_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator selectedOptionLabel={initialScreen?.label} />,
      subheading: "Change the screen that initially shows up once app starts",
      onPress: () => navigation?.navigate(SCREEN_NAMES.SELECT_HOME_SCREEN)
    },
    {
      label: "Privacy mode",
      iconComponent: <MaterialCommunityIcons name="shield-lock" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.PRIVACY_MODE_BACKGROUND_COLOR,
      endComponent: <Switch value={isPrivacyModeEnabled} onValueChange={togglePrivacyMode} color={colors?.primary} />,
      subheading: "Hide or show values in your portfolio"
    }
  ];

  return <Category heading="Preferences" options={options} />;
};

const mapStateToProps = createStructuredSelector({
  isDarkMode: selectIsThemeDark,
  isNotificationsEnabled: selectIsNotificationsEnabled,
  currencyCode: selectCurrencyCode,
  initialScreen: selectInitialScreen,
  isPrivacyModeEnabled: selectIsPrivacyModeEnabled
});

const mapDispatchToProps = (dispatch) => ({
  toggleDarkMode: () => dispatch(toggleTheme()),
  toggleNotifications: () => dispatch(toggleNotifications()),
  togglePrivacyMode: () => dispatch(togglePrivacyMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
