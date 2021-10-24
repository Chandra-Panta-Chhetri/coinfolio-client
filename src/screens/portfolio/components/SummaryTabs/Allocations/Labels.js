import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { TouchableNativeFeedback } from "../../../../../shared-components";
import { GLOBAL_CONSTANTS } from "../../../../../constants";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../../styles";

const AllocationLabels = ({
  data = [],
  selectedSlice = null,
  changeSelectedSlice = GLOBAL_CONSTANTS.EMPTY_FUNCTION
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {data.map((d, i) => (
        <TouchableNativeFeedback
          key={d.key}
          onPress={() => changeSelectedSlice(i, false)}
          viewContainerStyle={styles.touchableOpacityContainer}
        >
          <View
            style={[
              styles.labelContainer,
              i === selectedSlice
                ? {
                    ...GLOBAL_STYLES.borderRadius,
                    backgroundColor: colors.backgroundSelection
                  }
                : null
            ]}
          >
            <View
              style={[styles.pieSliceDot, { backgroundColor: d.svg.fill }]}
            />
            <Text style={TYPOGRAPHY.subheading}>{d.key}</Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1
  },
  container: {
    marginTop: 10
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: "center"
  },
  pieSliceDot: {
    ...GLOBAL_STYLES.borderRadius,
    width: 10,
    height: 5,
    marginRight: 4
  },
  touchableOpacityContainer: { marginRight: 0, flexGrow: 1 }
});

export default AllocationLabels;
