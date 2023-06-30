import React, { forwardRef } from "react";
import { Swipeable as RNSwipeable } from "react-native-gesture-handler";

const Swipeable = forwardRef(({ children, rightActions, leftActions, ...otherProps }, ref) => {
  return (
    <RNSwipeable
      renderRightActions={rightActions}
      overshootRight={false}
      overshootLeft={false}
      renderLeftActions={leftActions}
      friction={2}
      {...otherProps}
      ref={ref}
    >
      {children}
    </RNSwipeable>
  );
});

export default Swipeable;
