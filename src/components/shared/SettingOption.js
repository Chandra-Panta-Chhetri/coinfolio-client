import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";
import TouchableNativeOpacity from "./TouchableNativeOpacity";

const SettingOption = ({
  label = "",
  subheading,
  iconComponent,
  iconBackgroundColor = CONSTANTS.SETTINGS.ICON_COLOR,
  endComponent,
  onPress
}) => {
  const mainComponent = (
    <Card style={styles.container}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconAndLabel}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: iconBackgroundColor,
                borderRadius: CONSTANTS.SETTINGS.ICON_SIZE
              }
            ]}
          >
            {React.cloneElement(iconComponent, {
              color: CONSTANTS.SETTINGS.ICON_COLOR
            })}
          </View>
          <View style={styles.labelContainer}>
            <Text style={[GlobalStyles.subheading]}>{label}</Text>
            {subheading ? (
              <Text style={[GlobalStyles.caption]}>{subheading}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.endComponentContainer}>{endComponent}</View>
      </Card.Content>
    </Card>
  );

  if (onPress) {
    return (
      <TouchableNativeOpacity onPress={onPress}>
        {mainComponent}
      </TouchableNativeOpacity>
    );
  }

  return mainComponent;
};

const styles = StyleSheet.create({
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
    padding: 7
  },
  labelContainer: {
    marginLeft: 8,
    flex: 1
  },
  endComponentContainer: {
    flex: 1
  }
});

export default SettingOption;
