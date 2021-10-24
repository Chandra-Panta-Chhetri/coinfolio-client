import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { store, persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import { Main } from "./core/components";

export default App = () => (
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main />
    </PersistGate>
  </StoreProvider>
);
