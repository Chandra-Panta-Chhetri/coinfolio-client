import { createSelector } from "reselect";

const selectPreferences = (state) => state?.preferences;

export const selectIsThemeDark = createSelector([selectPreferences], (preferences) => preferences?.isThemeDark);

export const selectIsNotificationsEnabled = createSelector(
  [selectPreferences],
  (preferences) => preferences?.isNotificationsEnabled
);

export const selectCurrencyCode = createSelector([selectPreferences], (preferences) => preferences?.currencyCode);

export const selectInitialScreen = createSelector([selectPreferences], (preferences) => preferences?.initialScreen);

export const selectIsAuthEnabled = createSelector([selectPreferences], (preferences) => preferences?.isAuthEnabled);

export const selectIsPrivacyModeEnabled = createSelector(
  [selectPreferences],
  (preferences) => preferences?.isPrivacyModeEnabled
);
