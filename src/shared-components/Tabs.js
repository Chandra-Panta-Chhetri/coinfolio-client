import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from "react-native-reanimated";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../styles";
import PressableView from "./PressableView";

const SWITCH_ANIMATION_CONFIG = {
  duration: 280,
  easing: Easing.inOut(Easing.quad)
};

const getBorderStyles = (tabIndex, totalTabs) =>
  tabIndex === 0
    ? styles.noRightBorders
    : tabIndex + 1 === totalTabs
    ? styles.noLeftBorders
    : { ...styles.noRightBorders, ...styles.noLeftBorders };

const Tabs = ({
  children,
  initialActiveTab = 0,
  tabHeadingMarginBottom = 0
}) => {
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

  const tabWidth = numTabs === 0 ? 0 : tabHeadingContainerWidth / numTabs;

  const handleActiveTabSlide = (newTabIndex) => {
    translateX.value = tabHeadingContainerWidth;
    leftPosition.value = withTiming(
      newTabIndex * tabWidth,
      SWITCH_ANIMATION_CONFIG
    );
    translateX.value = withTiming(0, SWITCH_ANIMATION_CONFIG);
  };

  const handleTabClick = (tabIndex) => {
    if (tabIndex !== activeTab) {
      setActiveTab(tabIndex);
      setLoadedTabs([...loadedTabs.filter((i) => i !== tabIndex), tabIndex]);
      handleActiveTabSlide(tabIndex);
    }
  };

  return (
    <>
      <View
        style={[
          styles.tabHeadingContainer,
          { marginBottom: tabHeadingMarginBottom }
        ]}
        onLayout={(e) => {
          if (tabHeadingContainerWidth === 0) {
            const containerWidth = e.nativeEvent.layout.width;
            leftPosition.value =
              numTabs === 0 ? 0 : initialActiveTab * (containerWidth / numTabs);
            setTabHeadingContainerWidth(containerWidth);
          }
        }}
      >
        {children.map((child, index) => {
          const activeStyles =
            activeTab === index
              ? isDarkMode
                ? { color: colors.text }
                : { color: "white" }
              : { color: colors.placeholder };
          return (
            <PressableView
              key={index}
              onPress={() => handleTabClick(index)}
              viewStyle={[
                styles.tabContainer,
                {
                  borderColor: isDarkMode ? colors.border : colors.primary
                },
                getBorderStyles(index, numTabs)
              ]}
            >
              {React.cloneElement(child.props.iconComponent, {
                style: [activeStyles]
              })}
              <Text style={[TYPOGRAPHY.subheading, activeStyles]}>
                {child.props.iconComponent && " "}
                {child.props.tabLabel || ""}
              </Text>
            </PressableView>
          );
        })}
        <Animated.View
          style={[
            styles.activeTabOverlay,
            GLOBAL_STYLES.borderRadius,
            {
              width: `${numTabs === 0 ? 0 : 100 / numTabs}%`,
              backgroundColor: isDarkMode ? colors.border : colors.primary,
              ...getBorderStyles(activeTab, numTabs)
            },
            animatedTabHeadingStyle
          ]}
        />
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
    </>
  );
};

const styles = StyleSheet.create({
  tabHeadingContainer: {
    flexDirection: "row",
    position: "relative",
    height: 35
  },
  tabContainer: {
    flex: 1,
    borderColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...GLOBAL_STYLES.borderRadius,
    ...GLOBAL_STYLES.borderWidth
  },
  activeTabOverlay: {
    position: "absolute",
    height: "100%",
    top: 0,
    backgroundColor: "#007aff",
    zIndex: -1
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
