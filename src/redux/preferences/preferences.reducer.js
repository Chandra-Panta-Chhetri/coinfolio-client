import PREFERENCES_ACTION_TYPES from "./preferences.action.types";

const INITIAL_STATE = {
  isThemeDark: false,
  isNotificationsOn: true,
  currencyCode: "USD",
  homeScreen: {
    label: "Home",
    value: "Home"
  },
  isBiometricAuthOn: false,
  isPrivacyModeOn: false
};

const preferencesReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PREFERENCES_ACTION_TYPES.TOGGLE_THEME:
      return { ...prevState, isThemeDark: !prevState.isThemeDark };
    case PREFERENCES_ACTION_TYPES.TOGGLE_NOTIFICATIONS:
      return { ...prevState, isNotificationsOn: !prevState.isNotificationsOn };
    case PREFERENCES_ACTION_TYPES.CHANGE_CURRENCY:
      return { ...prevState, currencyCode: action.payload };
    case PREFERENCES_ACTION_TYPES.CHANGE_HOME_SCREEN:
      return { ...prevState, homeScreen: action.payload };
    case PREFERENCES_ACTION_TYPES.TOGGLE_BIOMETRIC_AUTH:
      return { ...prevState, isBiometricAuthOn: !prevState.isBiometricAuthOn };
    case PREFERENCES_ACTION_TYPES.TOGGLE_PRIVACY_MODE:
      return { ...prevState, isPrivacyModeOn: !prevState.isPrivacyModeOn };
    default:
      return prevState;
  }
};

export default preferencesReducer;
