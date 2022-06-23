import React from "react";
import { View, StyleSheet } from "react-native";

const MultiColumnView = ({ sections = [], renderItem, SectionSeparator, sectionStyle }) => {
  return (
    <View style={STYLES.container}>
      {sections.map(({ data }, index) => (
        <>
          <View key={index} style={[STYLES.sectionItem, sectionStyle]}>
            {data.map(renderItem)}
          </View>
          {SectionSeparator && index !== sections.length - 1 && <SectionSeparator />}
        </>
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
