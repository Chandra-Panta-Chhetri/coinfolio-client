import React from "react";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";

const App = () => <BottomTabNavigation />;

export default function () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
