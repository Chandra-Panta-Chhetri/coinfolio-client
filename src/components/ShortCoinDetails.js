import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { TYPOGRAPHY } from "../styles";
import IconImage from "./IconImage";
import TouchableNativeFeedback from "./TouchableNativeFeedback";
import { GLOBAL_CONSTANTS } from "../constants";

const ShortCoinDetails = ({ coin, onPress, children, containerStyles }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[STYLES.mainContainer, containerStyles]}>
        <View style={STYLES.iconName}>
          <IconImage source={{ uri: coin?.image }} />
          <View style={STYLES.nameSymbol}>
            <Text style={TYPOGRAPHY.body2}>{coin?.name}</Text>
            <Text style={TYPOGRAPHY.body1}>{coin?.symbol}</Text>
          </View>
        </View>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconName: {
    flexDirection: "row",
    alignItems: "center"
  },
  nameSymbol: {
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default ShortCoinDetails;
