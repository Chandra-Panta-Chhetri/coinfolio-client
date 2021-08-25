import React from "react";
import { withNavigation } from "@react-navigation/compat";
import { useTheme } from "react-native-paper";
import CONSTANTS from "../../Constants";
import MoreOptions from "../shared/MoreOptions";
import SettingGroup from "./SettingGroup";
import { Entypo } from "@expo/vector-icons";

const Account = ({ navigation }) => {
  const { colors } = useTheme();
  const settingOptions = [
    {
      label: "Change Password",
      iconComponent: <Entypo name="lock" size={CONSTANTS.SETTINGS.ICON_SIZE} />,
      iconBackgroundColor: CONSTANTS.SETTINGS.CHANGE_PASSWORD_BACKGROUND_COLOR,
      endComponent: <MoreOptions />,
      onPress: () => navigation.navigate("ChangePassword")
    },
    {
      label: "Change Email or Name",
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
