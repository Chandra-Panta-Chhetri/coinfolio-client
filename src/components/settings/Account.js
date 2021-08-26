import React from "react";
import { withNavigation } from "@react-navigation/compat";
import CONSTANTS from "../../Constants";
import MoreOptions from "../shared/MoreOptions";
import SettingGroup from "./SettingGroup";
import { Entypo } from "@expo/vector-icons";

const Account = ({ navigation }) => {
  const settingOptions = [
    {
      label: "Change password",
      iconComponent: <Entypo name="lock" size={CONSTANTS.SETTINGS.ICON_SIZE} />,
      iconBackgroundColor: CONSTANTS.SETTINGS.CHANGE_PASSWORD_BACKGROUND_COLOR,
      endComponent: <MoreOptions />,
      onPress: () => navigation.navigate("ChangePassword")
    },
    {
      label: "Change email or name",
      iconComponent: (
        <Entypo name="email" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.CHANGE_EMAIL_BACKGROUND_COLOR,
      endComponent: <MoreOptions />,
      onPress: () => navigation.navigate("ChangeEmailOrName")
    }
  ];

  return <SettingGroup heading="Account" settingOptions={settingOptions} />;
};

export default withNavigation(Account);
