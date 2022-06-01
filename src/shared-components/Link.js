import React from "react";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TYPOGRAPHY } from "../styles";

const Link = ({ label, navigateTo, navigationParams, ...otherProps }) => {
  const navigation = useNavigation();

  const onPress = () => navigation.navigate(navigateTo, navigationParams);

  return (
    <TouchableOpacity onPress={onPress} style={[otherProps.containerStyle]}>
      <Text {...otherProps} style={[TYPOGRAPHY.body2, otherProps.textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
