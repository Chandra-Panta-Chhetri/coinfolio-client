import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { selectHomeScreen } from "../redux/preferences/preferences.selectors";
import { changeHomeScreen } from "../redux/preferences/preferences.actions";
import GlobalStyles from "../GlobalStyles";
import {
  HomeTabIcon,
  PortfolioTabIcon,
  NewsTabIcon,
  MarketTabIcon
} from "../navigation/BottomTabNavigation";
import { Text, RadioButton, useTheme } from "react-native-paper";
import TouchableNativeOpacity from "../components/shared/TouchableNativeOpacity";

const options = [
  { label: "Home", icon: <HomeTabIcon /> },
  { label: "Market", icon: <MarketTabIcon /> },
  { label: "Portfolio", icon: <PortfolioTabIcon /> },
  { label: "News", icon: <NewsTabIcon /> }
];

const SelectHomeScreen = ({ currentHomeScreen, changeHomeScreen }) => {
  const { colors } = useTheme();

  return (
    <View style={GlobalStyles.screenContainer}>
      {options.map((op) => (
        <TouchableNativeOpacity
          key={op.label}
          viewContainerStyle={styles.touchableNativeContainer}
          onPress={() => changeHomeScreen(op.label)}
        >
          <View style={styles.radioButtonGroup}>
            <View style={styles.iconAndLabel}>
              {React.cloneElement(op.icon, {
                color: colors.text
              })}
              <Text style={[GlobalStyles.subheading, styles.radioButtonLabel]}>
                {op.label}
              </Text>
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
        </TouchableNativeOpacity>
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
    textTransform: "capitalize",
    marginLeft: 10
  }
});

const mapStateToProps = (state) => ({
  currentHomeScreen: selectHomeScreen(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeHomeScreen: (screenName) => dispatch(changeHomeScreen(screenName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectHomeScreen);
