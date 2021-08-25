import React from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const MoreOptions = ({ selectedOption }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {selectedOption ? (
        <Paragraph style={[GlobalStyles.body1, styles.label]}>
          {selectedOption}
        </Paragraph>
      ) : null}
      <MaterialIcons
        name="keyboard-arrow-right"
        size={CONSTANTS.SETTINGS.MORE_OPTIONS_ARROW_ICON_SIZE}
        color={colors.primary}
        style={GlobalStyles.textAlignRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  label: {
    width: "75%",
    textAlign: "right"
  }
});

export default MoreOptions;
