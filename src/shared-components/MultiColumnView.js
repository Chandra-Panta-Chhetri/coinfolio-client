import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

const MultiColumnView = ({ sections = [], renderItem, SectionSeparator, sectionStyle }) => {
  useEffect(() => {
    console.log("re-rendering sections changed");
  }, [sections]);

  return (
    <View style={STYLES.container}>
      {sections.map(({ data }, index) => (
        <React.Fragment key={index}>
          <View style={[STYLES.sectionItem, sectionStyle]}>{data.map(renderItem)}</View>
          {SectionSeparator && index !== sections.length - 1 && <SectionSeparator />}
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
