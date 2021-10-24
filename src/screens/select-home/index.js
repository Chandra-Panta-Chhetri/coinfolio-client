import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { selectHomeScreen, changeHomeScreen } from "../../redux/preferences";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import {
  HomeTabIcon,
  PortfolioTabIcon,
  NewsTabIcon,
  MarketTabIcon
} from "../../core/navigators/BottomTab/TabIcons";
import { Text, RadioButton, useTheme } from "react-native-paper";
import { TouchableNativeFeedback } from "../../shared-components";

const HOME_SCREEN_OPTIONS = [
  { label: "Home", icon: <HomeTabIcon /> },
  { label: "Market Overview", icon: <MarketTabIcon /> },
  { label: "Portfolio", icon: <PortfolioTabIcon /> },
  { label: "News", icon: <NewsTabIcon /> }
];

const SelectHomeScreen = ({ currentHomeScreen, changeHomeScreen }) => {
  const { colors } = useTheme();

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      {HOME_SCREEN_OPTIONS.map((op) => (
        <TouchableNativeFeedback
          key={op.label}
          viewContainerStyle={styles.touchableNativeContainer}
          onPress={() => changeHomeScreen(op.label)}
        >
          <View style={styles.radioButtonGroup}>
            <View style={styles.iconAndLabel}>
              {React.cloneElement(op.icon, {
                color: colors.text
              })}
              <Text style={styles.radioButtonLabel}>{op.label}</Text>
            </View>
            <View pointerEvents={"none"}>
              <RadioButton
                value={op.label}
                status={
                  currentHomeScreen === op.label ? "checked" : "unchecked"
                }
                color={colors.primary}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  touchableNativeContainer: { marginBottom: 10 },
  radioButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  iconAndLabel: { flexDirection: "row", alignItems: "center" },
  radioButtonLabel: {
    marginLeft: 10,
    ...TYPOGRAPHY.subheading,
    ...TYPOGRAPHY.capitalize
  }
});

const mapStateToProps = (state) => ({
  currentHomeScreen: selectHomeScreen(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeHomeScreen: (screenName) => dispatch(changeHomeScreen(screenName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectHomeScreen);
