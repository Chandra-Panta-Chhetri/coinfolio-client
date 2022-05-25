import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SearchIconButton } from "../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";

const Header = () => {
  const navigation = useNavigation();
  const goToSearchScreen = () => navigation.navigate("SearchCrypto");

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
