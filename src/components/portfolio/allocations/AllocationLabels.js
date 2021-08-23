import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Paragraph, useTheme } from "react-native-paper";
import TouchableNativeOpacity from "../../shared/TouchableNativeOpacity";
import CONSTANTS from "../../../Constants";
import GlobalStyles from "../../../GlobalStyles";

const AllocationLabels = ({
  data = [],
  selectedSlice = null,
  changeSelectedSlice = CONSTANTS.SHARED.EMPTY_FUNCTION
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {data.map((d, i) => {
        return (
          <TouchableNativeOpacity
            key={d.key}
            onPress={() => changeSelectedSlice(i, false)}
            viewContainerStyle={styles.touchableOpacityContainer}
          >
            <View
              style={[
                styles.labelContainer,
                i === selectedSlice
                  ? {
                      ...GlobalStyles.borderRadius,
                      backgroundColor: colors.backgroundSelection
                    }
                  : null
              ]}
            >
              <View
                style={[
                  styles.pieSliceDot,
                  { backgroundColor: d.svg.fill },
                  GlobalStyles.borderRadius
                ]}
              />
              <Paragraph style={GlobalStyles.subheading}>{d.key}</Paragraph>
            </View>
          </TouchableNativeOpacity>
        );
      })}
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
    width: 10,
    height: 5,
    marginRight: 4
  },
  touchableOpacityContainer: { marginRight: 0 }
});

export default AllocationLabels;
