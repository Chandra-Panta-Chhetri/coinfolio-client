import PREFERENCES_ACTION_TYPES from "./preferences.action.types";

export const toggleTheme = () => ({
  type: PREFERENCES_ACTION_TYPES.TOGGLE_THEME
});

export const toggleNotifications = () => ({
  type: PREFERENCES_ACTION_TYPES.TOGGLE_NOTIFICATIONS
});

export const changeCurrency = (currencyCode) => ({
  type: PREFERENCES_ACTION_TYPES.CHANGE_CURRENCY,
  payload: currencyCode
});

export const changeLaunchScreen = (launchScreen) => ({
  type: PREFERENCES_ACTION_TYPES.CHANGE_LAUNCH_SCREEN,
  payload: launchScreen
});

export const toggleBiometricAuth = () => ({
  type: PREFERENCES_ACTION_TYPES.TOGGLE_BIOMETRIC_AUTH
});
