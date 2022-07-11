import React from "react";
import { Skeleton } from "../../../shared-components";
import { StyleSheet } from "react-native";
import { GLOBAL_CONSTANTS } from "../../../constants";

const AboutSkeleton = () => (
  <>
    <Skeleton style={STYLES.links} />
    <Skeleton style={STYLES.description} />
  </>
);

const STYLES = StyleSheet.create({
  description: {
    width: "100%",
    height: 200
  },
  links: {
    width: "100%",
    height: 250,
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

export default AboutSkeleton;
