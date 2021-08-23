import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { Card, useTheme } from "react-native-paper";
import GlobalStyles from "../../GlobalStyles";

const PagingDots = ({ numOfDots = 0, activeDot, containerWidth = 0 }) => {
  const dots = Array(numOfDots).fill("1");
  const { colors, dark: isDarkMode } = useTheme();
  const activeDotStyles = {
    opacity: 1,
    color: isDarkMode ? colors.primary : colors.text
  };
  const nonActiveDotStyles = {
    opacity: isDarkMode ? 0.5 : 0.2,
    color: isDarkMode ? colors.placeholder : colors.text
  };

  return (
    <View style={[styles.pagingDots, { right: containerWidth / 2 }]}>
      {dots.map((_, i) => (
        <Text
          key={i}
          style={[
            styles.pagingDot,
            activeDot === i ? activeDotStyles : nonActiveDotStyles,
            GlobalStyles.display1
          ]}
        >
          &bull;
        </Text>
      ))}
    </View>
  );
};

const CardScrollView = ({ children, containerStyle = {} }) => {
  const [visibleWidth, setVisibleWidth] = useState(0);
  const [activeInterval, setActiveInterval] = useState(0);

  const onLayout = (event) => {
    const scrollViewWidth = event.nativeEvent.layout.width;
    if (visibleWidth === 0) {
      setVisibleWidth(scrollViewWidth);
    }
  };

  const onScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newActiveInterval = Math.floor(contentOffset / visibleWidth);
    if (newActiveInterval !== activeInterval) {
      setActiveInterval(newActiveInterval);
    }
  };

  return (
    <Card style={[styles.container, GlobalStyles.borderRadius, containerStyle]}>
      <Card.Content>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled
          onLayout={onLayout}
          onMomentumScrollEnd={onScroll}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { width: visibleWidth })
          )}
        </ScrollView>
        <PagingDots
          numOfDots={children.length}
          activeDot={activeInterval}
          containerWidth={visibleWidth}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  pagingDots: {
    position: "absolute",
    bottom: -11,
    flexDirection: "row"
  },
  pagingDot: {}
});

export default CardScrollView;
