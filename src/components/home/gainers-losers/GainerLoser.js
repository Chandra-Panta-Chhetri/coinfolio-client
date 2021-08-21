import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";
import {
  getStylesBasedOnPosOrNeg,
  appendPlusOrMinus
} from "../../../GlobalUtils";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";

const GainerLoser = ({ item, navigation }) => {
  return (
    <TouchableNativeOpacity
      activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
      viewContainerStyle={styles.androidContainer}
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
              <Paragraph style={GlobalStyles.subheading}>
                {item.fullName}
              </Paragraph>
              <Paragraph style={GlobalStyles.body1}>{item.ticker}</Paragraph>
            </View>
            <View style={styles.priceAndPercent}>
              <Paragraph style={GlobalStyles.subheading}>
                ${item.price}
              </Paragraph>
              <Paragraph
                style={[
                  GlobalStyles.body1,
                  getStylesBasedOnPosOrNeg(item.percentChange)
                ]}
              >
                {appendPlusOrMinus(item.percentChange)}%
              </Paragraph>
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
