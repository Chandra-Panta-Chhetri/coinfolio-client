import PREFERENCES_ACTION_TYPES from "./preferences.action.types";

const INITIAL_STATE = {
  isThemeDark: true
};

const preferencesReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case PREFERENCES_ACTION_TYPES.TOGGLE_THEME:
      return { ...prevState, isThemeDark: !prevState.isThemeDark };
    default:
      return prevState;
  }
};

export default preferencesReducer;
