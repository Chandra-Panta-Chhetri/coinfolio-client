import React from "react";
import { StyleSheet, View } from "react-native";
import { TYPOGRAPHY } from "../../../styles";
import { IconImage, TouchableNativeFeedback } from "../../../shared-components";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const SearchItem = ({ search, containerStyles = {} }) => {
  const navigation = useNavigation();
  const { image, name, symbol, id } = search;

  const onClick = () => navigation.navigate("AssetDetail", { image, name, symbol, id });

  return (
    <TouchableNativeFeedback onPress={onClick}>
      <View style={[STYLES.container, containerStyles]}>
        <IconImage source={{ uri: image }} />
        <View style={STYLES.nameSymbol}>
          <Text style={TYPOGRAPHY.body2}>{name}</Text>
          <Text style={TYPOGRAPHY.body1}>{symbol}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  nameSymbol: {
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

export default SearchItem;
