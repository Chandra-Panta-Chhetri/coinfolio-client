import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../constants";
import PagingDots from "./PagingDots";

const CardScrollView = ({ children, containerStyle }) => {
  const [visibleWidth, setVisibleWidth] = useState(0);
  const [activeInterval, setActiveInterval] = useState(0);

  const onLayout = (event) => {
    const scrollViewWidth = event?.nativeEvent?.layout?.width ?? 0;
    if (visibleWidth === 0) {
      setVisibleWidth(scrollViewWidth);
    }
  };

  const onScroll = (event) => {
    const contentOffset = event?.nativeEvent?.contentOffset?.x;
    const newActiveInterval = Math.floor(contentOffset / visibleWidth);
    if (newActiveInterval !== activeInterval) {
      setActiveInterval(newActiveInterval);
    }
  };

  return (
    <Card style={[STYLES.container, containerStyle]}>
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
          {React.Children.map(children, (child, i) => React.cloneElement(child, { width: visibleWidth }))}
        </ScrollView>
        {visibleWidth > 0 ? (
          <PagingDots numOfDots={children?.length} activeDot={activeInterval} containerWidth={visibleWidth} />
        ) : null}
      </Card.Content>
    </Card>
  );
};

const STYLES = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS
  }
});

export default CardScrollView;
