import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatNumBasedOnSignWorklet } from "../../../../utils";
import { TouchableNativeFeedback, IconImage } from "../../../../shared-components";
import { useNavigation } from "@react-navigation/native";

const GainerLoser = ({ coin, containerStyle = null }) => {
  const navigation = useNavigation();
  const { image, name, symbol, priceUsd, changePercent24Hr } = coin;

  const onPress = () => {
    navigation.navigate("AssetDetail", {});
  };

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle} onPress={onPress}>
      <Card style={GLOBAL_STYLES.borderRadius}>
        <Card.Content style={STYLES.gainerLoserCardBody}>
          <IconImage
            source={{
              uri: image
            }}
          />
          <View style={STYLES.gainerLoserInfoContainer}>
            <View>
              <Text style={TYPOGRAPHY.subheading}>{name}</Text>
              <Text style={TYPOGRAPHY.body1}>{symbol}</Text>
            </View>
            <View style={STYLES.priceAndPercent}>
              <Text style={TYPOGRAPHY.subheading}>${priceUsd}</Text>
              <Text style={[TYPOGRAPHY.body1, getStylesBasedOnSign(changePercent24Hr)]}>
                {formatNumBasedOnSignWorklet(changePercent24Hr)}%
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const STYLES = StyleSheet.create({
  gainerLoserCardBody: {
    flexDirection: "row",
    alignItems: "center"
  },
  gainerLoserInfoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 10
  },
  priceAndPercent: {
    alignItems: "flex-end"
  }
});

export default GainerLoser;
