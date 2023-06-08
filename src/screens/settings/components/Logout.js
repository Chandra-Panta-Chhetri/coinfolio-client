import React from "react";
import SETTINGS_CONSTANTS from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useConfirmationModal } from "../../../hooks";
import Setting from "./Setting";
import MoreOptionsIndicator from "./MoreOptionsIndicator";

const Logout = ({ logOut, isLoggingOut }) => {
  const { openModal: openLogoutModal, ConfirmationModal: LogoutConfirmationModal } = useConfirmationModal(
    "Logout Confirmation",
    "Are you sure you want to log out?",
    logOut,
    isLoggingOut
  );

  return (
    <>
      <Setting
        label="Logout"
        iconComponent={<MaterialIcons name="logout" size={SETTINGS_CONSTANTS.ICON_SIZE} />}
        iconBackgroundColor={SETTINGS_CONSTANTS.LOG_OUT_BACKGROUND_COLOR}
        endComponent={<MoreOptionsIndicator />}
        onPress={openLogoutModal}
      />
      <LogoutConfirmationModal />
    </>
  );
};

export default Logout;
