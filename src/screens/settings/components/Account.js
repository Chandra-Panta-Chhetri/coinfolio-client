import React from "react";
import { useNavigation } from "@react-navigation/native";
import SETTINGS_CONSTANTS from "../constants";
import MoreOptionsIndicator from "./MoreOptionsIndicator";
import Category from "./Category";
import { Entypo } from "@expo/vector-icons";
import SCREEN_NAMES from "../../../navigators/screen-names";

const Account = () => {
  const navigation = useNavigation();

  const options = [
    {
      label: "Change password",
      iconComponent: <Entypo name="lock" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.CHANGE_PASSWORD_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: () => navigation?.navigate(SCREEN_NAMES.CHANGE_PASSWORD)
    },
    {
      label: "Change email or name",
      iconComponent: <Entypo name="email" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.CHANGE_EMAIL_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: () => navigation?.navigate(SCREEN_NAMES.CHANGE_EMAIL_OR_NAME)
    }
  ];

  return <Category heading="Account" options={options} />;
};

export default Account;
