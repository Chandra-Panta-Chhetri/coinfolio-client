import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import React, { useMemo, forwardRef } from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";

const Backdrop = (props) => <BottomSheetBackdrop {...props} opacity={0.6} appearsOnIndex={0} disappearsOnIndex={-1} />;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const BottomSheet = forwardRef(({ children, name }, ref) => {
  const memoizedSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(memoizedSnapPoints);
  const { colors } = useTheme();

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: colors.bottomSheet }}
      ref={ref}
      name={name}
      snapPoints={animatedSnapPoints}
      backdropComponent={Backdrop}
      handleIndicatorStyle={{ backgroundColor: colors.text }}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      enablePanDownToClose
    >
      <View onLayout={handleContentLayout} style={{ maxHeight: DEVICE_HEIGHT }}>
        {children}
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;
