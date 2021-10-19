import React, { useState } from "react";
import { Menu, useTheme, Text } from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";
import CONSTANTS from "../../Constants";
import TouchableNativeOpacity from "./TouchableNativeOpacity";
import { AntDesign } from "@expo/vector-icons";
import GlobalStyles from "../../GlobalStyles";

const DropDown = ({
  selectedIndex = 0,
  onSelect = CONSTANTS.SHARED.EMPTY_FUNCTION,
  options = [],
  containerStyle = {},
  hasBorders = true
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
      <TouchableNativeOpacity
        onPress={toggleDropDownVisibility}
        viewContainerStyle={{
          borderWidth: hasBorders ? CONSTANTS.SHARED.BORDER_WIDTH : 0,
          borderColor: colors.text
        }}
        onLayout={onLayout}
      >
        <View style={styles.container}>
          <Text style={[GlobalStyles.body1]}>
            {options[selectedIndex].label}
          </Text>
          <AntDesign
            name={showDropDown ? "caretup" : "caretdown"}
            color={colors.text}
            style={GlobalStyles.body1}
          />
        </View>
      </TouchableNativeOpacity>
      <Menu
        visible={showDropDown}
        onDismiss={hideDropDown}
        anchor={<View style={styles.dropDownAnchor} />}
        style={{
          width: dropDownWidth.width
        }}
        contentStyle={styles.menuContent}
        statusBarHeight={0}
      >
        <ScrollView style={styles.optionsContainer}>
          {options.map((op, i) => (
            <TouchableNativeOpacity
              onPress={() => {
                if (selectedIndex !== i) {
                  onSelect(op.value, i);
                }
                hideDropDown();
              }}
              key={op.value}
            >
              <View style={styles.option}>
                <Text style={GlobalStyles.body1}>{op.label}</Text>
                {selectedIndex === i && (
                  <AntDesign
                    name="check"
                    style={GlobalStyles.body1}
                    color={colors.text}
                  />
                )}
              </View>
            </TouchableNativeOpacity>
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
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
    ...GlobalStyles.borderRadius
  },
  dropDownAnchor: {
    height: 1
  }
});

export default DropDown;
