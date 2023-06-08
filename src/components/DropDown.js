import React, { useState } from "react";
import { Menu, useTheme, Text } from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";
import TouchableNativeFeedback from "./TouchableNativeFeedback";
import { AntDesign } from "@expo/vector-icons";
import { TYPOGRAPHY } from "../styles";
import TouchableOption from "./TouchableOption";
import { GLOBAL_CONSTANTS } from "../constants";
import { isNullOrUndefined } from "../utils";

const DropDown = ({ selectedIndex = 0, onSelect, options, containerStyle }) => {
  const { colors } = useTheme();

  const [dropDownWidth, setDropDownWidth] = useState({
    width: 0,
    hasBeenCalculated: false
  });
  const [showDropDown, setShowDropDown] = useState(false);

  const onLayout = (event) => {
    if (!dropDownWidth.hasBeenCalculated) {
      setDropDownWidth({
        width: event?.nativeEvent?.layout?.width,
        hasBeenCalculated: true
      });
    }
  };

  const hideDropDown = () => setShowDropDown(false);
  const toggleDropDownVisibility = () => setShowDropDown((prevVal) => !prevVal);

  const selectedOptionLabel =
    isNullOrUndefined(options) || isNullOrUndefined(options[selectedIndex]) ? "" : options[selectedIndex]?.label;

  return (
    <View style={containerStyle}>
      <TouchableNativeFeedback
        onPress={toggleDropDownVisibility}
        viewContainerStyle={{
          borderColor: colors?.text,
          borderWidth: GLOBAL_CONSTANTS.BORDER_WIDTH
        }}
        onLayout={onLayout}
      >
        <View style={STYLES.container}>
          <Text style={[TYPOGRAPHY.body1]}>{selectedOptionLabel}</Text>
          <AntDesign name={showDropDown ? "caretup" : "caretdown"} color={colors?.text} style={TYPOGRAPHY.body1} />
        </View>
      </TouchableNativeFeedback>
      <Menu
        visible={showDropDown}
        onDismiss={hideDropDown}
        anchor={<View style={STYLES.dropDownAnchor} />}
        style={{
          width: dropDownWidth?.width
        }}
        contentStyle={STYLES.menuContent}
        statusBarHeight={0}
      >
        <ScrollView style={STYLES.optionsContainer}>
          {options.map((op, i) => (
            <TouchableOption
              label={op?.label}
              key={op?.value}
              isSelected={selectedIndex === i}
              onSelect={() => {
                if (selectedIndex !== i && !isNullOrUndefined(onSelect)) {
                  onSelect(op?.value, i);
                }
                hideDropDown();
              }}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  optionsContainer: {
    maxHeight: 200
  },
  menuContent: {
    paddingVertical: 0,
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  },
  dropDownAnchor: {
    height: 1
  }
});

export default DropDown;
