import React from "react";
import { useNavigation } from "@react-navigation/native";
import SETTINGS_CONSTANTS from "../Constants";
import MoreOptionsIndicator from "./MoreOptionsIndicator";
import SettingGroup from "./SettingGroup";
import { Entypo } from "@expo/vector-icons";

const AccountSettings = () => {
  const navigation = useNavigation();

  const settingOptions = [
    {
      label: "Change password",
      iconComponent: <Entypo name="lock" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.CHANGE_PASSWORD_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: () => navigation.navigate("ChangePassword")
    },
    {
      label: "Change email or name",
      iconComponent: (
        <Entypo name="email" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.CHANGE_EMAIL_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: () => navigation.navigate("ChangeEmailOrName")
    }
  ];

  return <SettingGroup heading="Account" settingOptions={settingOptions} />;
};

export default AccountSettings;
