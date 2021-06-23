import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing
} from "react-native-reanimated";

const getBorderStyles = (tabIndex, totalTabs) =>
  tabIndex === 0
    ? styles.noRightBorders
    : tabIndex + 1 === totalTabs
    ? styles.noLeftBorders
    : { ...styles.noRightBorders, ...styles.noLeftBorders };

const animationConfig = {
  duration: 280,
  easing: Easing.inOut(Easing.quad)
};

const Tabs = ({ children, initialActiveTab = 0 }) => {
  const numTabs = children.length;
  const { dark: isDarkMode, colors } = useTheme();

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [loadedTabs, setLoadedTabs] = useState([initialActiveTab]);
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
    leftPosition.value = withTiming(
      newTabIndex * (tabHeadingContainerWidth / numTabs),
      animationConfig
    );
    translateX.value = withTiming(0, animationConfig);
  };

  const handleTabClick = (tabIndex) => {
    if (tabIndex !== activeTab) {
      handleActiveTabSlide(tabIndex);
      setActiveTab(tabIndex);
      setLoadedTabs([...loadedTabs.filter((i) => i !== tabIndex), tabIndex]);
    }
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
            onPress={() => handleTabClick(index)}
          >
            <View
              style={[
                styles.tabContainer,
                {
                  borderColor: isDarkMode ? colors.border : colors.primary
                },
                getBorderStyles(index, numTabs)
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
              backgroundColor: isDarkMode ? colors.border : colors.primary,
              ...getBorderStyles(activeTab, numTabs)
            },
            animatedTabHeadingStyle
          ]}
        ></Animated.View>
      </View>
      <Animated.View style={animatedTabContentStyle}>
        {React.Children.map(children, (child, i) => {
          const hasTabBeenSelected = loadedTabs.includes(i);
          const isTabActive = i === activeTab;

          if (!hasTabBeenSelected) {
            return null;
          }

          return (
            <View style={[isTabActive ? null : { display: "none" }]}>
              {child}
            </View>
          );
        })}
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
