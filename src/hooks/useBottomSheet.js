import React, { useRef } from "react";
import { BottomSheet } from "../shared-components";

export const useBottomSheet = ({ name, snapPoints }) => {
  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => bottomSheetRef.current && bottomSheetRef.current.present();
  const closeBottomSheet = () => bottomSheetRef.current && bottomSheetRef.current.dismiss();

  return {
    openBottomSheet,
    closeBottomSheet,
    BottomSheet: ({ children }) => (
      <BottomSheet snapPoints={snapPoints} name={name} ref={bottomSheetRef}>
        {children}
      </BottomSheet>
    )
  };
};
