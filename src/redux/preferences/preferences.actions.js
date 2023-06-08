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

export const changeHomeScreen = (screenNameVal) => ({
  type: PREFERENCES_ACTION_TYPES.CHANGE_HOME_SCREEN,
  payload: screenNameVal
});

export const toggleAuth = () => ({
  type: PREFERENCES_ACTION_TYPES.TOGGLE_AUTH
});

export const togglePrivacyMode = () => ({
  type: PREFERENCES_ACTION_TYPES.TOGGLE_PRIVACY_MODE
});
