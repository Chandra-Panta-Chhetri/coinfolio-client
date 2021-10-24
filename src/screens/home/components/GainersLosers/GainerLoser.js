import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { getStylesBasedOnSign, formatNumBasedOnSign } from "../../../../utils";
import { TouchableNativeFeedback } from "../../../../shared-components";

const GainerLoser = ({ item, navigation, index }) => {
  return (
    <TouchableNativeFeedback
      viewContainerStyle={index !== 0 ? styles.androidContainer : null}
    >
      <Card style={GLOBAL_STYLES.borderRadius}>
        <Card.Content style={styles.gainerLoserCardBody}>
          <Avatar.Image
            size={GLOBAL_CONSTANTS.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <View style={styles.gainerLoserInfoContainer}>
            <View>
              <Text style={TYPOGRAPHY.subheading}>{item.fullName}</Text>
              <Text style={TYPOGRAPHY.body1}>{item.ticker}</Text>
            </View>
            <View style={styles.priceAndPercent}>
              <Text style={TYPOGRAPHY.subheading}>${item.price}</Text>
              <Text
                style={[
                  TYPOGRAPHY.body1,
                  getStylesBasedOnSign(item.percentChange)
                ]}
              >
                {formatNumBasedOnSign(item.percentChange)}%
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  androidContainer: {
    marginTop: 10
  },
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
