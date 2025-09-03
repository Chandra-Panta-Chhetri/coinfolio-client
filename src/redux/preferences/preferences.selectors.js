import { createSelector } from "reselect";

const selectPreferenceStore = (state) => state?.preferences;

export const selectIsThemeDark = createSelector([selectPreferenceStore], (ps) => ps?.isThemeDark);

export const selectIsNotificationsEnabled = createSelector([selectPreferenceStore], (ps) => ps?.isNotificationsEnabled);

export const selectCurrencyCode = createSelector([selectPreferenceStore], (ps) => ps?.currencyCode);

export const selectInitialScreen = createSelector([selectPreferenceStore], (ps) => ps?.initialScreen);

export const selectIsAuthEnabled = createSelector([selectPreferenceStore], (ps) => ps?.isAuthEnabled);

export const selectIsPrivacyModeEnabled = createSelector([selectPreferenceStore], (ps) => ps?.isPrivacyModeEnabled);
