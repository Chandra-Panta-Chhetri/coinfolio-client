import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { TouchableNativeFeedback } from "../../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";

const AllocationLabels = ({ data = [], selectedSlice = null, changeSelectedSlice }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={STYLES.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={STYLES.container}
    >
      {data.map((d, i) => (
        <TouchableNativeFeedback
          key={d.key}
          onPress={() => changeSelectedSlice && changeSelectedSlice(i, false)}
          viewContainerStyle={STYLES.touchableOpacityContainer}
        >
          <View
            style={[
              STYLES.labelContainer,
              i === selectedSlice
                ? {
                    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
                    backgroundColor: colors.backgroundSelection
                  }
                : null
            ]}
          >
            <View style={[STYLES.pieSliceDot, { backgroundColor: d.svg.fill }]} />
            <Text style={TYPOGRAPHY.subheading}>{d.key}</Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  contentContainer: {
    flexGrow: 1
  },
  container: {
    marginTop: GLOBAL_CONSTANTS.MD_MARGIN
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: "center"
  },
  pieSliceDot: {
    borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
    width: 10,
    height: 5,
    marginRight: GLOBAL_CONSTANTS.SM_MARGIN
  },
  touchableOpacityContainer: { marginRight: 0, flexGrow: 1 }
});

export default AllocationLabels;
