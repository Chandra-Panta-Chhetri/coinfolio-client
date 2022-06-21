import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { GLOBAL_CONSTANTS } from "../constants";

const IconImage = ({ source, fallbackURL = "https://coincap.io/static/logo_mark.png" }) => {
  const [imageURL, setImageURL] = useState(source.uri);

  const onLoadError = () => {
    setImageURL(fallbackURL);
  };

  return <Image source={{ uri: imageURL }} onError={onLoadError} style={STYLES.icon} />;
};

const STYLES = StyleSheet.create({
  icon: {
    backgroundColor: "transparent",
    width: GLOBAL_CONSTANTS.ICON_SIZE,
    height: GLOBAL_CONSTANTS.ICON_SIZE,
    borderRadius: GLOBAL_CONSTANTS.ICON_SIZE / 2
  }
});

export default IconImage;
