import React, { useState } from "react";
import { Menu, useTheme, Text } from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";
import { GLOBAL_CONSTANTS } from "../constants";
import TouchableNativeFeedback from "./TouchableNativeFeedback";
import { AntDesign } from "@expo/vector-icons";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";

const DropDown = ({
  selectedIndex = 0,
  onSelect = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  options = [],
  containerStyle = {}
}) => {
  const { colors } = useTheme();

  const [dropDownWidth, setDropDownWidth] = useState({
    width: 0,
    hasBeenCalculated: false
  });
  const [showDropDown, setShowDropDown] = useState(false);

  const onLayout = (event) => {
    if (!dropDownWidth.hasBeenCalculated) {
      setDropDownWidth({
        width: event.nativeEvent.layout.width,
        hasBeenCalculated: true
      });
    }
  };

  const hideDropDown = () => setShowDropDown(false);
  const toggleDropDownVisibility = () => setShowDropDown(!showDropDown);

  return (
    <View style={containerStyle}>
      <TouchableNativeFeedback
        onPress={toggleDropDownVisibility}
        viewContainerStyle={{
          borderColor: colors.text,
          ...GLOBAL_STYLES.borderWidth
        }}
        onLayout={onLayout}
      >
        <View style={STYLES.container}>
          <Text style={[TYPOGRAPHY.body1]}>{options[selectedIndex].label}</Text>
          <AntDesign
            name={showDropDown ? "caretup" : "caretdown"}
            color={colors.text}
            style={TYPOGRAPHY.body1}
          />
        </View>
      </TouchableNativeFeedback>
      <Menu
        visible={showDropDown}
        onDismiss={hideDropDown}
        anchor={<View style={STYLES.dropDownAnchor} />}
        style={{
          width: dropDownWidth.width
        }}
        contentStyle={STYLES.menuContent}
        statusBarHeight={0}
      >
        <ScrollView style={STYLES.optionsContainer}>
          {options.map((op, i) => (
            <TouchableNativeFeedback
              onPress={() => {
                if (selectedIndex !== i) {
                  onSelect(op.value, i);
                }
                hideDropDown();
              }}
              key={op.value}
            >
              <View style={STYLES.option}>
                <Text style={TYPOGRAPHY.body1}>{op.label}</Text>
                {selectedIndex === i && (
                  <AntDesign
                    name="check"
                    style={TYPOGRAPHY.body1}
                    color={colors.text}
                  />
                )}
              </View>
            </TouchableNativeFeedback>
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
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  menuContent: {
    paddingVertical: 0,
    ...GLOBAL_STYLES.borderRadius
  },
  dropDownAnchor: {
    height: 1
  }
});

export default DropDown;
