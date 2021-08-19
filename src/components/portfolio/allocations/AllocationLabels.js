import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Paragraph } from "react-native-paper";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";

const AllocationLabels = ({
  data = [],
  selectedSlice = null,
  changeSelectedSlice = CONSTANTS.SHARED.EMPTY_FUNCTION
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {data.map((pieSlice, i) => {
        return (
          <TouchableNativeOpacity
            key={pieSlice.key}
            activeOpacity={CONSTANTS.SHARED.TOUCHABLE_ACTIVE_OPACITY}
            onPress={() => changeSelectedSlice(i, false)}
            viewContainerStyle={styles.touchableOpacityContainer}
          >
            <View
              style={[
                styles.labelContainer,
                i === selectedSlice
                  ? {
                      ...GlobalStyles.borderRadius,
                      ...styles.activeLabel
                    }
                  : null
              ]}
            >
              <View
                style={[
                  styles.pieSliceDot,
                  { backgroundColor: pieSlice.svg.fill },
                  GlobalStyles.borderRadius
                ]}
              />
              <Paragraph style={styles.label}>{pieSlice.key}</Paragraph>
            </View>
          </TouchableNativeOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
    flexGrow: 1
  },
  container: {
    marginVertical: 6
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: "center"
  },
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  activeLabel: {
    backgroundColor: "#D8D8D8"
  },
  pieSliceDot: {
    width: 10,
    height: 5,
    marginRight: 4
  },
  touchableOpacityContainer: { marginRight: 0 }
});

export default AllocationLabels;
