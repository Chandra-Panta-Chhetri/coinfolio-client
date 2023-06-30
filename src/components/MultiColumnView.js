import React from "react";
import { View, StyleSheet } from "react-native";
import { isNullOrUndefined } from "../utils";

const MultiColumnView = ({ sections, renderItem, SectionSeparator, sectionStyle }) => {
  return (
    <View style={STYLES.container}>
      {(sections ?? []).map(({ data }, index) => (
        <React.Fragment key={index}>
          <View style={[STYLES.sectionItem, sectionStyle]}>{(data ?? []).map(renderItem)}</View>
          {!isNullOrUndefined(SectionSeparator) && index !== (sections ?? []).length - 1 ? <SectionSeparator /> : null}
        </React.Fragment>
      ))}
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  sectionItem: {
    flex: 1
  }
});

export default MultiColumnView;
