import {
  MD2DarkTheme as PaperDarkTheme,
  MD2LightTheme as PaperLightTheme,
  adaptNavigationTheme
} from "react-native-paper";
import { DefaultTheme as NavigationLightTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";

// const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
//   reactNavigationLight: DefaultTheme,
//   reactNavigationDark: DarkTheme
// });

export const LIGHT = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
    primaryShimmer: "gainsboro",
    secondaryShimmer: "#f8f8f8",
    touchableRipple: "#a9a9a9",
    backgroundSelection: "#f3f3f3",
    primary: "#1a87ff",
    bottomSheet: "#f2f2f2"
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
    primary: "#1a87ff",
    bottomSheet: "#272729"
  }
};
