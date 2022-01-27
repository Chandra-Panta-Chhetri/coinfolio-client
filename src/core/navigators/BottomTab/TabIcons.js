import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { GLOBAL_CONSTANTS } from "../../../constants";

export const HomeTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <AntDesign name="home" size={size} color={color} />
);

export const MarketTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <AntDesign name="barschart" size={size} color={color} />
);

export const PortfolioTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <Feather name="pie-chart" size={size} color={color} />
);

export const DiscoverTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <Feather name="compass" size={size} color={color} />
);

export const SettingsTabIcon = ({ color, size = GLOBAL_CONSTANTS.TAB_ICON_SIZE }) => (
  <AntDesign name="setting" size={size} color={color} />
);
