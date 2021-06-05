import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated
} from "react-native";

const Tabs = ({ children, initialActiveTab = 0 }) => {
  const numTabs = children.length;
  const widthPerTab = 100 / numTabs;

  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [tabHeadingContainerWidth, setTabHeadingContainerWidth] = useState(0);
  const [activeOverlayLeftPosition, setActiveOverlayLeftPosition] = useState(
    new Animated.Value(initialActiveTab * (tabHeadingContainerWidth / numTabs))
  );

  const handleActiveTabSlide = (newTabIndex) => {
    Animated.spring(activeOverlayLeftPosition, {
      toValue: newTabIndex * (tabHeadingContainerWidth / numTabs),
      useNativeDriver: false,
      bounciness: 2,
      speed: 6
    }).start();
  };

  return (
    <View>
      <View
        style={styles.tabHeadingContainer}
        onLayout={(e) =>
          setTabHeadingContainerWidth(e.nativeEvent.layout.width)
        }
      >
        {children.map((child, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              setActiveTab(index);
              handleActiveTabSlide(index);
            }}
          >
            <View
              style={[
                styles.tabContainer,
                index === 0
                  ? styles.noRightBorders
                  : index + 1 === numTabs
                  ? styles.noLeftBorders
                  : { ...styles.noRightBorders, ...styles.noLeftBorders }
              ]}
            >
              <Text
                style={
                  activeTab === index ? styles.activeTabLabel : styles.tabLabel
                }
              >
                {child.props.tabLabel}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
        <Animated.View
          style={[
            styles.activeTabOverlay,
            {
              width: `${widthPerTab}%`,
              left: activeOverlayLeftPosition
            }
          ]}
        ></Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabHeadingContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
    height: 40
  },
  tabContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#007aff",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
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
    color: "black",
    fontWeight: "bold"
  },
  activeTabLabel: {
    color: "white",
    fontWeight: "bold"
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
