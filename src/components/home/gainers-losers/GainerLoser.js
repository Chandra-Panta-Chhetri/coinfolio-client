import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";
import {
  getStylesBasedOnPosOrNeg,
  appendPlusOrMinus
} from "../../../GlobalUtils";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const GainerLoser = ({ item, navigation, index }) => {
  return (
    <TouchableNativeOpacity
      viewContainerStyle={index !== 0 ? styles.androidContainer : null}
    >
      <Card style={GlobalStyles.borderRadius}>
        <Card.Content style={styles.gainerLoserCardBody}>
          <Avatar.Image
            size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
            source={{
              uri: item.image
            }}
          />
          <View style={styles.gainerLoserInfoContainer}>
            <View>
              <Text style={GlobalStyles.subheading}>{item.fullName}</Text>
              <Text style={GlobalStyles.body1}>{item.ticker}</Text>
            </View>
            <View style={styles.priceAndPercent}>
              <Text style={GlobalStyles.subheading}>${item.price}</Text>
              <Text
                style={[
                  GlobalStyles.body1,
                  getStylesBasedOnPosOrNeg(item.percentChange)
                ]}
              >
                {appendPlusOrMinus(item.percentChange)}%
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeOpacity>
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
