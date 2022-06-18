import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { Main } from "./core/components";
import { SplashScreen } from "./screens";
import { authAPI } from "./api";
import { loginSuccess, loginFail } from "./redux/user";
import * as SecureStore from "expo-secure-store";

const autoLogin = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      return;
    }
    const user = await authAPI.getUserFromToken(token);
    store.dispatch(loginSuccess(user, token));
  } catch (err) {
    store.dispatch(loginFail("Log in again for security purposes"));
  }
};

export default App = () => {
  const initializeApp = async () => {
    await autoLogin();
  };

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<SplashScreen />} onBeforeLift={initializeApp} persistor={persistor}>
        <Main />
      </PersistGate>
    </StoreProvider>
  );
};
