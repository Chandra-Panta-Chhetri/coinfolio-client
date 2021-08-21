import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native";

export const DefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primaryShimmer: "gainsboro",
    secondaryShimmer: "#f8f8f8",
    portfolio: {
      loginBtnBackground: "#c4c3c7",
      loginBtnText: "black"
    }
  }
};

export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    text: "white",
    primaryShimmer: "#7d7d7d",
    secondaryShimmer: "gainsboro",
    portfolio: {
      loginBtnBackground: "#23262d",
      loginBtnText: "white"
    }
  }
};

console.log(DefaultTheme);

//{ color: "#7a7a7a" }
