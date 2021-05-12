import React from "react";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/redux/store.js";

const App = () => <BottomTabNavigation />;

export default function () {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}
