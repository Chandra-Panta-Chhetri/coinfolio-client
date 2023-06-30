import React, { useState } from "react";
import Dialog from "../components/ConfirmationModal";

export const useConfirmationModal = (confirmationTitle, confirmationText, onConfirm, isLoading) => {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return {
    openModal,
    ConfirmationModal: (props) => (
      <Dialog
        isVisible={isVisible}
        hideDialog={closeModal}
        onConfirm={onConfirm}
        confirmationText={confirmationText}
        confirmationTitle={confirmationTitle}
        isLoading={isLoading}
        {...props}
      />
    ),
    closeModal
  };
};
