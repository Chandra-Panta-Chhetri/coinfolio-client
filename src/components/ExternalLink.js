import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";
import { TYPOGRAPHY } from "../styles";
import { isNullOrUndefined, removeUrlPrefix } from "../utils";

const ExternalLink = ({ label, url, children, ...otherProps }) => {
  const onPress = () => Linking.openURL(url);

  return (
    <TouchableOpacity onPress={onPress} style={[otherProps?.containerStyle]}>
      <View style={STYLES.linkContainer}>
        <Text {...otherProps} style={[TYPOGRAPHY.body2, otherProps?.textStyle]}>
          {isNullOrUndefined(label) ? removeUrlPrefix(url) : label}
        </Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const STYLES = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default ExternalLink;
