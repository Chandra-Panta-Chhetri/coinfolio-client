import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";

const Tabs = ({ children, initialActiveTab = 0 }) => {
  const numTabs = children.length;
  const { dark: isDarkMode, colors } = useTheme();

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [tabHeadingContainerWidth, setTabHeadingContainerWidth] = useState(0);
  const leftPosition = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animatedTabHeadingStyle = useAnimatedStyle(() => ({
    left: leftPosition.value
  }));

  const animatedTabContentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }));

  const handleActiveTabSlide = (newTabIndex) => {
    translateX.value = tabHeadingContainerWidth;
    leftPosition.value = withSpring(
      newTabIndex * (tabHeadingContainerWidth / numTabs),
      {
        velocity: 30,
        overshootClamping: true,
        damping: 7,
        mass: 2
      }
    );
    translateX.value = withSpring(0, {
      velocity: 30,
      overshootClamping: true,
      damping: 7,
      mass: 2
    });
  };

  return (
    <View>
      <View
        style={styles.tabHeadingContainer}
        onLayout={(e) => {
          const containerWidth = e.nativeEvent.layout.width;
          leftPosition.value = initialActiveTab * (containerWidth / numTabs);
          setTabHeadingContainerWidth(containerWidth);
        }}
      >
        {children.map((child, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              if (index !== activeTab) {
                setActiveTab(index);
                handleActiveTabSlide(index);
              }
            }}
          >
            <View
              style={[
                styles.tabContainer,
                {
                  borderColor: isDarkMode ? colors.border : colors.primary
                },
                index === 0
                  ? styles.noRightBorders
                  : index + 1 === numTabs
                  ? styles.noLeftBorders
                  : { ...styles.noRightBorders, ...styles.noLeftBorders }
              ]}
            >
              {React.cloneElement(child.props.iconComponent, {
                style: {
                  color:
                    activeTab === index
                      ? isDarkMode
                        ? colors.primary
                        : "white"
                      : colors.text
                }
              })}
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === index
                    ? isDarkMode
                      ? { color: colors.primary }
                      : { color: "white" }
                    : { color: colors.text }
                ]}
              >
                {child.props.iconComponent && " "}
                {child.props.tabLabel || ""}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
        <Animated.View
          style={[
            styles.activeTabOverlay,
            {
              width: `${100 / numTabs}%`,
              backgroundColor: isDarkMode ? colors.border : colors.primary
            },
            animatedTabHeadingStyle
          ]}
        ></Animated.View>
      </View>
      <Animated.View style={animatedTabContentStyle}>
        {children[activeTab]}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabHeadingContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
    height: 35
  },
  tabContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#007aff",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  activeTabOverlay: {
    position: "absolute",
    height: "100%",
    top: 0,
    backgroundColor: "#007aff",
    zIndex: -1,
    borderRadius: 4
  },
  tabLabel: {
    fontWeight: "bold",
    letterSpacing: 1
  },
  noRightBorders: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  noLeftBorders: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
});

export default Tabs;
