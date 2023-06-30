import { authAPI } from "../../api";
import { loginSuccess, loginFail } from "./user.actions";
import * as SecureStore from "expo-secure-store";
import { store } from "../";
import { isNullOrUndefined } from "../../utils";
import { USER_CONFIG } from "./constants";

export const autoLogin = async () => {
  try {
    const token = await SecureStore.getItemAsync(USER_CONFIG.SECURE_STORE_TOKEN_KEY_NAME);
    if (!isNullOrUndefined(token)) {
      const user = await authAPI.getUserFromToken(token);
      store.dispatch(loginSuccess(user, token));
    }
  } catch (err) {
    store.dispatch(loginFail("Log in again for security purposes"));
  }
};
