import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import SETTINGS_CONSTANTS from "../Constants";
import { TYPOGRAPHY } from "../../../styles";
import { TouchableNativeFeedback } from "../../../shared-components";

const SettingItem = ({
  label = "",
  subheading,
  iconComponent,
  iconBackgroundColor = SETTINGS_CONSTANTS.ICON_COLOR,
  endComponent,
  onPress
}) => {
  const mainComponent = (
    <Card style={STYLES.container}>
      <Card.Content style={STYLES.cardContent}>
        <View style={STYLES.iconAndLabel}>
          <View
            style={[
              STYLES.iconContainer,
              {
                backgroundColor: iconBackgroundColor
              }
            ]}
          >
            {React.cloneElement(iconComponent, {
              color: SETTINGS_CONSTANTS.ICON_COLOR
            })}
          </View>
          <View style={STYLES.labelContainer}>
            <Text style={TYPOGRAPHY.subheading}>{label}</Text>
            {subheading ? (
              <Text style={TYPOGRAPHY.caption}>{subheading}</Text>
            ) : null}
          </View>
        </View>
        <View style={STYLES.endComponentContainer}>{endComponent}</View>
      </Card.Content>
    </Card>
  );

  if (onPress) {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {mainComponent}
      </TouchableNativeFeedback>
    );
  }

  return mainComponent;
};

const STYLES = StyleSheet.create({
  container: { marginTop: 10 },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconAndLabel: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: SETTINGS_CONSTANTS.ICON_SIZE,
    width: SETTINGS_CONSTANTS.ICON_SIZE * 2,
    height: SETTINGS_CONSTANTS.ICON_SIZE * 2
  },
  labelContainer: {
    marginLeft: 8,
    flex: 1
  },
  endComponentContainer: {
    flex: 1
  }
});

export default SettingItem;
