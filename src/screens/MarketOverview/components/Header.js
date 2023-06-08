import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SearchIconButton } from "../../../components";
import { TYPOGRAPHY } from "../../../styles";
import SCREEN_NAMES from "../../../navigators/screen-names";

const Header = () => {
  const navigation = useNavigation();
  const goToSearchScreen = () => navigation?.navigate(SCREEN_NAMES.SEARCH_CRYPTO);

  return (
    <View style={STYLES.container}>
      <Text style={TYPOGRAPHY.display1}>Markets</Text>
      <SearchIconButton onPress={goToSearchScreen} />
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default Header;
