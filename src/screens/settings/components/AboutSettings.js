import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import SETTINGS_CONSTANTS from "../Constants";
import MoreOptionsIndicator from "./MoreOptionsIndicator";
import SettingGroup from "./SettingGroup";
import { Octicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { TYPOGRAPHY } from "../../../styles";
import { expo } from "../../../../app.json";
import { Share, Platform, StyleSheet } from "react-native";
import { addErrorNotification } from "../../../redux/notification";
import { connect } from "react-redux";
import Typography from "../../../styles/Typography";

const IOS_SHARE_LINK =
  "https://play.google.com/store/apps/details?id=com.coinmarketcap.android";
const ANDROID_SHARE_LINK =
  "https://play.google.com/store/apps/details?id=com.coinmarketcap.android";

const AboutSettings = ({ includeContainerStyle, showErrorNotification }) => {
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      await Share.share({
        message: `Stay up to date with the latest crypto news and keep track of the crypto market and your crypto investments! Download the Coinfolio App: ${Platform.select(
          { ios: IOS_SHARE_LINK, android: ANDROID_SHARE_LINK }
        )}`
      });
    } catch (err) {
      showErrorNotification();
    }
  };

  const settingOptions = [
    {
      label: "Terms & privacy",
      iconComponent: (
        <FontAwesome name="legal" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor:
        SETTINGS_CONSTANTS.TERMS_AND_PRIVACY_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: () => navigation.navigate("TermsAndPrivacy")
    },
    {
      label: "Share",
      iconComponent: (
        <Entypo name="share" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.SHARE_BACKGROUND_COLOR,
      endComponent: <MoreOptionsIndicator />,
      onPress: onShare
    },
    {
      label: "Version",
      iconComponent: (
        <Octicons name="versions" size={SETTINGS_CONSTANTS.ICON_SIZE} />
      ),
      iconBackgroundColor: SETTINGS_CONSTANTS.VERSION_BACKGROUND_COLOR,
      endComponent: <Text style={STYLES.versionLabel}>{expo.version}</Text>
    }
  ];

  return (
    <SettingGroup
      heading="About"
      settingOptions={settingOptions}
      includeContainerStyle={includeContainerStyle}
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

const STYLES = StyleSheet.create({
  versionLabel: {
    ...TYPOGRAPHY.body1,
    ...Typography.textAlignCenter
  }
});

export default connect(null, mapDispatchToProps)(AboutSettings);
