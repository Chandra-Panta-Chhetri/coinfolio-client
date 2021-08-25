import React from "react";
import { withNavigation } from "@react-navigation/compat";
import { Paragraph, useTheme } from "react-native-paper";
import CONSTANTS from "../../Constants";
import MoreOptions from "../shared/MoreOptions";
import SettingGroup from "./SettingGroup";
import { Octicons } from "@expo/vector-icons";
import GlobalStyles from "../../GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { expo } from "../../../app.json";

const About = ({ navigation }) => {
  const { colors } = useTheme();
  const settingOptions = [
    {
      label: "Terms & Privacy",
      iconComponent: (
        <FontAwesome name="legal" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor:
        CONSTANTS.SETTINGS.TERMS_AND_PRIVACY_BACKGROUND_COLOR,
      endComponent: <MoreOptions />,
      onPress: () => navigation.navigate("TermsAndPrivacy")
    },
    {
      label: "Version",
      iconComponent: (
        <Octicons name="versions" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.VERSION_BACKGROUND_COLOR,
      endComponent: (
        <Paragraph style={[GlobalStyles.body1, GlobalStyles.textAlignRight]}>
          {expo.version}
        </Paragraph>
      )
    }
  ];

  return <SettingGroup heading="About" settingOptions={settingOptions} />;
};

export default withNavigation(About);
