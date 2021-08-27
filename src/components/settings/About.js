import React from "react";
import { withNavigation } from "@react-navigation/compat";
import { Paragraph } from "react-native-paper";
import CONSTANTS from "../../Constants";
import MoreOptions from "../shared/MoreOptions";
import SettingGroup from "./SettingGroup";
import { Octicons } from "@expo/vector-icons";
import GlobalStyles from "../../GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { expo } from "../../../app.json";
import { Share, Platform } from "react-native";
import { addErrorNotification } from "../../redux/notification/notification.actions";
import { connect } from "react-redux";
import { compose } from "redux";

const About = ({
  navigation,
  includeComponentContainerStyle,
  showErrorNotification
}) => {
  const onShare = async () => {
    try {
      await Share.share({
        message: `Stay up to date with the latest crypto news and keep track of the crypto market and your crypto investments! Download the Coinfolio App: ${
          Platform.OS === "android"
            ? CONSTANTS.SHARE_DOWNLOAD_LINK.ANDROID
            : CONSTANTS.SHARE_DOWNLOAD_LINK.IOS
        }`
      });
    } catch (err) {
      showErrorNotification();
    }
  };

  const settingOptions = [
    {
      label: "Terms & privacy",
      iconComponent: (
        <FontAwesome name="legal" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor:
        CONSTANTS.SETTINGS.TERMS_AND_PRIVACY_BACKGROUND_COLOR,
      endComponent: <MoreOptions />,
      onPress: () => navigation.navigate("TermsAndPrivacy")
    },
    {
      label: "Share",
      iconComponent: (
        <Entypo name="share" size={CONSTANTS.SETTINGS.ICON_SIZE} />
      ),
      iconBackgroundColor: CONSTANTS.SETTINGS.SHARE_BACKGROUND_COLOR,
      endComponent: <MoreOptions />,
      onPress: onShare
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

  return (
    <SettingGroup
      heading="About"
      settingOptions={settingOptions}
      includeComponentContainerStyle={includeComponentContainerStyle}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  showErrorNotification: () =>
    dispatch(
      addErrorNotification(
        "An unexpected error occured while trying to share. Please try again later"
      )
    )
});

export default compose(
  connect(null, mapDispatchToProps),
  withNavigation
)(About);
