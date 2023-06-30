import React from "react";
import { Text } from "react-native-paper";
import { IconImage } from "../../../components";
import { TYPOGRAPHY } from "../../../styles";
import { StyleSheet, View } from "react-native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const HeaderTitle = (props) => {
  const {
    params: { image, symbol }
  } = props;

  return (
    <View style={STYLES.container}>
      <IconImage source={{ uri: image }} />
      <Text style={[TYPOGRAPHY.title, { marginLeft: GLOBAL_CONSTANTS.SM_MARGIN }]}>{symbol}</Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" }
});

export default HeaderTitle;
