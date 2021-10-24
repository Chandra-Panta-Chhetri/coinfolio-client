import React, { useState } from "react";
import { ConfirmationDialog as Dialog } from "../shared-components";

export const useConfirmationDialog = (
  confirmationTitle,
  confirmationText,
  onConfirmCb,
  isLoading
) => {
  const [isVisible, setIsVisible] = useState(false);
  const openDialog = () => setIsVisible(true);
  const closeDialog = () => setIsVisible(false);

  return {
    openDialog,
    ConfirmationDialog: () => (
      <Dialog
        isVisible={isVisible}
        hideDialog={closeDialog}
        onConfirmCb={onConfirmCb}
        confirmationText={confirmationText}
        confirmationTitle={confirmationTitle}
        isLoading={isLoading}
      />
    )
  };
};
