import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { selectHomeScreen, changeHomeScreen } from "../../redux/preferences";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import {
  HomeTabIcon,
  PortfolioTabIcon,
  DiscoverTabIcon,
  MarketTabIcon
} from "../../core/navigators/BottomTab/TabIcons";
import { Text, RadioButton, useTheme } from "react-native-paper";
import { TouchableNativeFeedback } from "../../shared-components";
import { GLOBAL_CONSTANTS } from "../../constants";

const HOME_SCREEN_OPTIONS = [
  { label: "Home", value: "Home", icon: <HomeTabIcon /> },
  {
    label: "Market Overview",
    value: "MarketOverview",
    icon: <MarketTabIcon />
  },
  { label: "Portfolio", value: "Portfolio", icon: <PortfolioTabIcon /> },
  { label: "Discover", value: "Discover", icon: <DiscoverTabIcon /> }
];

const SelectHomeScreen = ({ currentHomeScreen, changeHomeScreen }) => {
  const { colors } = useTheme();

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      {HOME_SCREEN_OPTIONS.map((op) => (
        <TouchableNativeFeedback
          key={op.label}
          viewContainerStyle={STYLES.touchableNativeContainer}
          onPress={() => changeHomeScreen({ label: op.label, value: op.value })}
        >
          <View style={STYLES.radioButtonGroup}>
            <View style={STYLES.iconAndLabel}>
              {React.cloneElement(op.icon, {
                color: colors.text
              })}
              <Text style={STYLES.radioButtonLabel}>{op.label}</Text>
            </View>
            <View pointerEvents={"none"}>
              <RadioButton
                value={op.label}
                status={currentHomeScreen.value === op.value ? "checked" : "unchecked"}
                color={colors.primary}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

const STYLES = StyleSheet.create({
  touchableNativeContainer: { marginBottom: GLOBAL_CONSTANTS.MD_MARGIN },
  radioButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  iconAndLabel: { flexDirection: "row", alignItems: "center" },
  radioButtonLabel: {
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN,
    ...TYPOGRAPHY.subheading,
    ...TYPOGRAPHY.capitalize
  }
});

const mapStateToProps = (state) => ({
  currentHomeScreen: selectHomeScreen(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeHomeScreen: (screenNameVal) => dispatch(changeHomeScreen(screenNameVal))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectHomeScreen);
