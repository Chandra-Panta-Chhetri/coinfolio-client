import { createSelector } from "reselect";
import { isNullOrUndefined } from "../../utils";

const selectUserStore = (state) => state?.user;

export const selectCurrentUser = createSelector([selectUserStore], (us) => us?.currentUser);

export const selectIsChangingAuthState = createSelector([selectUserStore], (us) => us?.isChangingAuthState);

export const selectIsAuthenticated = createSelector([selectCurrentUser], (user) => !isNullOrUndefined(user));

export const selectAuthToken = createSelector([selectUserStore], (us) => us?.token);
