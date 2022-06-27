import React from "react";
import { Text } from "react-native-paper";
import { IconImage } from "../../../shared-components";
import { TYPOGRAPHY } from "../../../styles";
import { View } from "react-native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const HeaderTitle = (props) => {
  const {
    params: { image, name }
  } = props;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconImage source={{ uri: image }} />
      <Text style={[TYPOGRAPHY.title, { marginLeft: GLOBAL_CONSTANTS.SM_MARGIN }]}>{name}</Text>
    </View>
  );
};

export default HeaderTitle;
