import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatNumBasedOnSignWorklet } from "../../../../utils";
import { TouchableNativeFeedback } from "../../../../shared-components";
import { useNavigation } from "@react-navigation/native";

const GainerLoser = ({ coin, containerStyle = null }) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback viewContainerStyle={containerStyle}>
      <Card style={GLOBAL_STYLES.borderRadius}>
        <Card.Content style={STYLES.gainerLoserCardBody}>
          <Avatar.Image
            size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
            source={{
              uri: coin.image
            }}
          />
          <View style={STYLES.gainerLoserInfoContainer}>
            <View>
              <Text style={TYPOGRAPHY.subheading}>{coin.name}</Text>
              <Text style={TYPOGRAPHY.body1}>{coin.symbol}</Text>
            </View>
            <View style={STYLES.priceAndPercent}>
              <Text style={TYPOGRAPHY.subheading}>${coin.priceUsd}</Text>
              <Text style={[TYPOGRAPHY.body1, getStylesBasedOnSign(coin.changePercent24Hr)]}>
                {formatNumBasedOnSignWorklet(coin.changePercent24Hr)}%
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
