import React from "react";
import { Swipeable as RNSwipeable } from "react-native-gesture-handler";

const Swipeable = ({ children, rightActions, leftActions, ...otherProps }) => {
  return (
    <RNSwipeable
      renderRightActions={rightActions}
      overshootRight={false}
      overshootLeft={false}
      renderLeftActions={leftActions}
      {...otherProps}
    >
      {children}
    </RNSwipeable>
  );
};

export default Swipeable;
