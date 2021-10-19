import React, { useState } from "react";
import ConfirmationDialog from "../components/shared/ConfirmationDialog";

const useConfirmationDialog = (
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
    ConfirmationDialog: (
      <ConfirmationDialog
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

export default useConfirmationDialog;
