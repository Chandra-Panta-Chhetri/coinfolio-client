import { createSelector } from "reselect";

const selectPreferences = (state) => state.preferences;

export const selectIsThemeDark = createSelector(
  [selectPreferences],
  (preferences) => preferences.isThemeDark
);
