import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import SETTINGS_CONSTANTS from "../constants";
import MoreOptionsIndicator from "./MoreOptionsIndicator";
import Category from "./Category";
import { Octicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { expo } from "../../../../app.json";
import { Share, Platform, StyleSheet } from "react-native";
import { addErrorNotification } from "../../../redux/notification";
import { connect } from "react-redux";
import { TYPOGRAPHY } from "../../../styles";
import SCREEN_NAMES from "../../../navigators/screen-names";

const About = ({ includeContainerStyle, showErrorNotification }) => {
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      await Share.share({
        message: `Stay up to date with the latest crypto news and keep track of the crypto market and your crypto investments! Download the Coinfolio App: ${Platform.select(
          { ios: SETTINGS_CONSTANTS.IOS_SHARE_LINK, android: SETTINGS_CONSTANTS.ANDROID_SHARE_LINK }
        )}`
      });
    } catch (err) {
      showErrorNotification();
    }
  };

  const options = [
    {
      label: "Terms & privacy",
      iconComponent: <FontAwesome name="legal" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.TERMS_AND_PRIVACY_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: () => navigation?.navigate(SCREEN_NAMES.TERMS_AND_PRIVACY)
    },
    {
      label: "Share",
      iconComponent: <Entypo name="share" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.SHARE_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: onShare
    },
    {
      label: "Version",
      iconComponent: <Octicons name="versions" size={SETTINGS_CONSTANTS.ICON_SIZE} />,
      iconBackgroundColor: SETTINGS_CONSTANTS.VERSION_BACKGROUND_COLOR,
      endComponent: <Text style={STYLES.versionLabel}>{expo?.version}</Text>
    }
  ];

  return <Category heading="About" options={options} includeContainerStyle={includeContainerStyle} />;
};

const mapDispatchToProps = (dispatch) => ({
  showErrorNotification: () =>
    dispatch(addErrorNotification("An unexpected error occured while trying to share. Please try again later"))
});

const STYLES = StyleSheet.create({
  versionLabel: {
    ...TYPOGRAPHY.body1,
    ...TYPOGRAPHY.textAlignCenter
  }
});

export default connect(null, mapDispatchToProps)(About);
