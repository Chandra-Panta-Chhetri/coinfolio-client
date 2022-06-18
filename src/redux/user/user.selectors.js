import { createSelector } from "reselect";

const selectUserStore = (state) => state.user;

export const selectCurrentUser = createSelector([selectUserStore], (us) => us.currentUser);

export const selectIsChangingAuthState = createSelector([selectUserStore], (us) => us.isChangingAuthState);

export const selectIsUserAuthenticated = createSelector([selectCurrentUser], (user) => user !== null);

export const selectUserToken = createSelector([selectUserStore], (us) => us.token);
