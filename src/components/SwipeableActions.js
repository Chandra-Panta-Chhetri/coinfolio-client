import React from "react";
import { isNullOrUndefined } from "../utils";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { COLORS, GLOBAL_CONSTANTS } from "../constants";

const SwipeableActions = ({ callbackParams, onDelete, onEdit, progressAnimatedVal, dragAnimatedVal }) => {
  const showDelete = !isNullOrUndefined(onDelete);
  const showEdit = !isNullOrUndefined(onEdit);
  const functionParams = callbackParams ?? [];
  const onDeletePress = () => {
    if (showDelete) {
      onDelete(...functionParams);
    }
  };

  const onEditPress = () => {
    if (showEdit) {
      onEdit(...functionParams);
    }
  };

  return (
    <View style={STYLES.actions}>
      {showEdit ? (
        <Button mode="contained" style={STYLES.button} onPress={onEditPress}>
          <AntDesign name="edit" size={GLOBAL_CONSTANTS.ICON_SIZE} />
        </Button>
      ) : null}
      {showDelete ? (
        <Button mode="contained" style={STYLES.button} buttonColor={COLORS.ERROR} onPress={onDeletePress}>
          <AntDesign name="delete" size={GLOBAL_CONSTANTS.ICON_SIZE} />
        </Button>
      ) : null}
    </View>
  );
};

const STYLES = StyleSheet.create({
  actions: { display: "flex", flexDirection: "row" },
  button: {
    borderRadius: 0,
    justifyContent: "center"
  }
});

export default SwipeableActions;
