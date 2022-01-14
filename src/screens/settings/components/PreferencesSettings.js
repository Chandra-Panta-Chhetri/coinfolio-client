import React from "react";
import { connect } from "react-redux";
import {
  selectCurrencyCode,
  selectIsNotificationsOn,
  selectIsPrivacyModeOn,
  selectIsThemeDark,
  selectHomeScreen,
  toggleNotifications,
  togglePrivacyMode,
  toggleTheme
} from "../../../redux/preferences";
import { useNavigation } from "@react-navigation/native";
import { Switch, useTheme } from "react-native-paper";
import {
  FontAwesome5,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import SETTINGS_CONSTANTS from "../Constants";
import { createStructuredSelector } from "reselect";
import MoreOptionsIndicator from "./MoreOptionsIndicator";
import SettingGroup from "./SettingGroup";

const PreferencesSettings = ({
  isDarkMode,
  toggleDarkMode,
  toggleNotifications,
  isNotificationsOn,
  currencyCode,
  homeScreen,
  togglePrivacyMode,
  isPrivacyModeOn
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const settingOptions = [
    {
      label: "Dark mode",
      iconComponent: (
        <Ionicons name="moon" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.DARK_MODE_BACKGROUND_COLOR,
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
        <Ionicons name="notifications" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor:
        SETTINGS_CONSTANTS.RECEIVE_NOTIFICATIONS_BACKGROUND_COLOR,
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
          size={SETTINGS_CONSTANTS.ICON_SIZE}
        />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.CURRENCY_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator selectedOption={currencyCode} />,
      onPress: () => navigation.navigate("SelectCurrency")
    },
    {
      label: "Home screen",
      iconComponent: (
        <AntDesign name="home" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.HOME_SCREEN_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator selectedOption={homeScreen.label} />,
      subheading:
        "Change the screen that initially shows up once app starts up",
      onPress: () => navigation.navigate("SelectHomeScreen")
    },
    {
      label: "Privacy mode",
      iconComponent: (
        <MaterialCommunityIcons
          name="shield-lock"
          size={SETTINGS_CONSTANTS.ICON_SIZE}
        />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.PRIVACY_MODE_BACKGROUND_COLOR,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferencesSettings);
