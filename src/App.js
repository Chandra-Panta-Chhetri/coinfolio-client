import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./Main";
import { SplashScreen } from "./screens";
import { autoLogin } from "./redux/user/user.utils";

const initializeApp = async () => {
  await autoLogin();
};

export default App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<SplashScreen />} onBeforeLift={initializeApp} persistor={persistor}>
        <Main />
      </PersistGate>
    </StoreProvider>
  );
};
