import React from "react";
import { PressableView } from "../../../../components";
import { Text, useTheme } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { TYPOGRAPHY } from "../../../../styles";
import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const TableHeading = ({ heading, onPress, columnToSortBy, sortingInAscending }) => {
  const { colors } = useTheme();

  return (
    <PressableView key={heading?.label} onPress={() => onPress(heading)} viewStyle={heading?.style}>
      <Text style={TYPOGRAPHY.body1}>{heading?.label}</Text>
      {columnToSortBy === heading?.sortByField ? (
        <AntDesign
          name={sortingInAscending ? "caretup" : "caretdown"}
          size={12}
          style={STYLES.sortArrow}
          color={colors?.text}
        />
      ) : null}
    </PressableView>
  );
};

const STYLES = StyleSheet.create({
  sortArrow: {
    marginLeft: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

export default TableHeading;
