import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import SETTINGS_CONSTANTS from "../constants";
import { TYPOGRAPHY } from "../../../styles";
import { TouchableNativeFeedback } from "../../../components";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { isNullOrUndefined } from "../../../utils";

const Setting = ({ label, subheading, iconComponent, iconBackgroundColor, endComponent }) => (
  <Card style={STYLES.container}>
    <Card.Content style={STYLES.cardContent}>
      <View style={STYLES.iconAndLabel}>
        <View
          style={[
            STYLES.iconContainer,
            {
              backgroundColor: isNullOrUndefined(iconBackgroundColor)
                ? SETTINGS_CONSTANTS.ICON_COLOR
                : iconBackgroundColor
            }
          ]}
        >
          {React.cloneElement(iconComponent, {
            color: SETTINGS_CONSTANTS.ICON_COLOR
          })}
        </View>
        <View style={STYLES.labelContainer}>
          <Text style={TYPOGRAPHY.subheading}>{label}</Text>
          {subheading ? <Text style={TYPOGRAPHY.caption}>{subheading}</Text> : null}
        </View>
      </View>
      <View style={STYLES.endComponentContainer}>{endComponent}</View>
    </Card.Content>
  </Card>
);

const SettingContainer = ({ label, subheading, iconComponent, iconBackgroundColor, endComponent, onPress }) => {
  if (!isNullOrUndefined(onPress)) {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <>
          <Setting
            label={label}
            subheading={subheading}
            iconComponent={iconComponent}
            iconBackgroundColor={iconBackgroundColor}
            endComponent={endComponent}
          />
        </>
      </TouchableNativeFeedback>
    );
  }

  return (
    <Setting
      label={label}
      subheading={subheading}
      iconComponent={iconComponent}
      iconBackgroundColor={iconBackgroundColor}
      endComponent={endComponent}
    />
  );
};

const STYLES = StyleSheet.create({
  container: { marginTop: GLOBAL_CONSTANTS.MD_MARGIN },
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
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN,
    flex: 1
  },
  endComponentContainer: {
    flex: 1
  }
});

export default SettingContainer;
