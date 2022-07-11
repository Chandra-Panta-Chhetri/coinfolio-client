import React from "react";
import { Text } from "react-native-paper";
import { IconImage } from "../../../shared-components";
import { TYPOGRAPHY } from "../../../styles";
import { View } from "react-native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const HeaderTitle = (props) => {
  const {
    params: { image, symbol }
  } = props;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconImage source={{ uri: image }} />
      <Text style={[TYPOGRAPHY.title, { marginLeft: GLOBAL_CONSTANTS.SM_MARGIN }]}>{symbol}</Text>
    </View>
  );
};

export default HeaderTitle;
