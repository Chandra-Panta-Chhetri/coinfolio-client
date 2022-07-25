import { registerRootComponent } from "expo";
import App from "./src/App";
import { Platform } from "react-native";

if (Platform.OS === "android") {
  require("intl");
  require("intl/locale-data/jsonp/en-US");
}

registerRootComponent(App);
