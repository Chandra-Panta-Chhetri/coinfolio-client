import React from "react";
import { View, StyleSheet } from "react-native";
import { TYPOGRAPHY } from "../../../styles";
import { Text } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../constants";

const UserDetails = ({ currentUser }) => {
  return (
    <View style={STYLES.container}>
      <Text style={TYPOGRAPHY.title}>{currentUser?.name}</Text>
      <Text style={TYPOGRAPHY.body1}>{currentUser?.email}</Text>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 130
  }
});

export default UserDetails;
