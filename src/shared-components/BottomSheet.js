import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";

const Backdrop = (props) => (
  <BottomSheetBackdrop
    {...props}
    opacity={0.6}
    enableTouchThrough
    pressBehavior={"close"}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
  />
);

const BottomSheet = React.forwardRef(({ children, snapPoints = ["45%"], name }, ref) => {
  const memoizedSnapPoints = useMemo(() => snapPoints, []);

  return (
    <BottomSheetModal ref={ref} name={name} snapPoints={memoizedSnapPoints} backdropComponent={Backdrop}>
      {children}
    </BottomSheetModal>
  );
});

export default BottomSheet;
