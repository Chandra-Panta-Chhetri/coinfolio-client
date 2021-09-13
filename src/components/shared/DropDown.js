import React, { useState, useRef } from "react";
import { Menu, useTheme, Text } from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";
import CONSTANTS from "../../Constants";
import TouchableNativeOpacity from "./TouchableNativeOpacity";
import { AntDesign } from "@expo/vector-icons";
import GlobalStyles from "../../GlobalStyles";

const DropDown = ({
  initialSelectedIndex = 0,
  onSelect = CONSTANTS.SHARED.EMPTY_FUNCTION,
  options = [],
  containerStyle = {}
}) => {
  const { colors } = useTheme();

  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [anchorDimensions, setAnchorDimensions] = useState({
    width: 0,
    pageX: 0,
    pageY: 0,
    hasBeenCalculated: false
  });
  const [showDropDown, setShowDropDown] = useState(false);

  const onLayout = () => {
    if (anchorRef.current && !anchorDimensions.hasBeenCalculated) {
      anchorRef.current.measure((x, y, width, height, pageX, pageY) =>
        setAnchorDimensions({
          hasBeenCalculated: true,
          width,
          pageX,
          pageY: pageY + height + 1
        })
      );
    }
  };

  const hideDropDown = () => setShowDropDown(false);
  const toggleDropDownVisibility = () => setShowDropDown(!showDropDown);

  const AnchorComponent = () => (
    <TouchableNativeOpacity
      onPress={toggleDropDownVisibility}
      viewContainerStyle={[
        containerStyle,
        styles.anchorTouchableContainer,
        {
          borderColor: colors.primary
        }
      ]}
      onLayout={onLayout}
    >
      <View style={styles.anchorContainer} ref={anchorRef}>
        <Text style={[GlobalStyles.body1]}>{options[selectedIndex].label}</Text>
        <AntDesign
          name={showDropDown ? "caretup" : "caretdown"}
          color={colors.text}
          style={GlobalStyles.body1}
        />
      </View>
    </TouchableNativeOpacity>
  );

  return (
    <Menu
      visible={showDropDown}
      onDismiss={hideDropDown}
      anchor={<AnchorComponent />}
      style={{
        maxWidth: anchorDimensions.width,
        width: anchorDimensions.width,
        top: anchorDimensions.pageY,
        left: anchorDimensions.pageX
      }}
      contentStyle={styles.menuContent}
    >
      <ScrollView style={styles.menuItemScrollView}>
        {options.map((op, i) => (
          <TouchableNativeOpacity
            onPress={() => {
              if (selectedIndex !== i) {
                onSelect(op.value);
                setSelectedIndex(i);
              }
              hideDropDown();
            }}
            key={op.value}
          >
            <View style={styles.menuItem}>
              <Text style={[GlobalStyles.body1]}>{op.label}</Text>
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
  );
};

const styles = StyleSheet.create({
  anchorTouchableContainer: {
    borderWidth: 1
  },
  anchorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  menuItemScrollView: {
    maxHeight: 200
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  menuContent: {
    paddingVertical: 0
  }
});

export default DropDown;
