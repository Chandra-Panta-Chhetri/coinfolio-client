import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { COLORS, GLOBAL_CONSTANTS } from "../constants";

const DEFAULT_FALLBACK_URL = "https://coincap.io/static/logo_mark.png";

const IconImage = ({ source, fallbackURL = DEFAULT_FALLBACK_URL }) => {
  const [imageURL, setImageURL] = useState(source?.uri);

  const onLoadError = () => setImageURL(fallbackURL);

  return <Image source={{ uri: imageURL }} onError={onLoadError} style={STYLES.icon} />;
};

const STYLES = StyleSheet.create({
  icon: {
    backgroundColor: COLORS.TRANSPARENT,
    width: GLOBAL_CONSTANTS.ICON_SIZE,
    height: GLOBAL_CONSTANTS.ICON_SIZE,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE / 2
  }
});

export default IconImage;
