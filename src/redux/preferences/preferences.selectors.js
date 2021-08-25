import { createSelector } from "reselect";

const selectPreferences = (state) => state.preferences;

export const selectIsThemeDark = createSelector(
  [selectPreferences],
  (preferences) => preferences.isThemeDark
);

export const selectIsNotificationsOn = createSelector(
  [selectPreferences],
  (preferences) => preferences.isNotificationsOn
);

export const selectCurrencyCode = createSelector(
  [selectPreferences],
  (preferences) => preferences.currencyCode
);

export const selectLaunchScreen = createSelector(
  [selectPreferences],
  (preferences) => preferences.launchScreen
);

export const selectIsBiometricAuthOn = createSelector(
  [selectPreferences],
  (preferences) => preferences.isBiometricAuthOn
);

export const selectIsPrivacyModeOn = createSelector(
  [selectPreferences],
  (preferences) => preferences.isPrivacyModeOn
);
