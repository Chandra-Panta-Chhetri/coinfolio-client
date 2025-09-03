import SCREEN_NAMES from "../../navigators/screen-names";
import PREFERENCES_ACTION_TYPES from "./preferences.action.types";

const INITIAL_STATE = {
  isThemeDark: false,
  isNotificationsEnabled: true,
  currencyCode: "USD",
  initialScreen: {
    label: "Home",
    value: SCREEN_NAMES.HOME
  },
  isAuthEnabled: false,
  isPrivacyModeEnabled: false
};

const preferencesReducer = (prevState = INITIAL_STATE, action) => {
  switch (action?.type) {
    case PREFERENCES_ACTION_TYPES.TOGGLE_THEME:
      return { ...prevState, isThemeDark: !prevState?.isThemeDark };
    case PREFERENCES_ACTION_TYPES.TOGGLE_NOTIFICATIONS:
      return { ...prevState, isNotificationsEnabled: !prevState?.isNotificationsEnabled };
    case PREFERENCES_ACTION_TYPES.CHANGE_CURRENCY:
      return { ...prevState, currencyCode: action?.payload };
    case PREFERENCES_ACTION_TYPES.CHANGE_HOME_SCREEN:
      return { ...prevState, initialScreen: action?.payload };
    case PREFERENCES_ACTION_TYPES.TOGGLE_AUTH:
      return { ...prevState, isAuthEnabled: !prevState?.isAuthEnabled };
    case PREFERENCES_ACTION_TYPES.TOGGLE_PRIVACY_MODE:
      return { ...prevState, isPrivacyModeEnabled: !prevState?.isPrivacyModeEnabled };
    default:
      return prevState;
  }
};

export default preferencesReducer;
