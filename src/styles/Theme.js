import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native";

export const LIGHT = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primaryShimmer: "gainsboro",
    secondaryShimmer: "#f8f8f8",
    touchableRipple: "lightgrey",
    backgroundSelection: "#f3f3f3",
    primary: "#1a87ff"
  }
};

export const DARK = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    text: "white",
    primaryShimmer: "#7d7d7d",
    secondaryShimmer: "gainsboro",
    touchableRipple: "grey",
    backgroundSelection: "#a3cfff",
    primary: "#1a87ff"
  }
};
