import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { Skeleton, TouchableNativeFeedback } from "../../../../components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../../styles";
import { isNullOrUndefined } from "../../../../utils";

const Label = ({ label, changeSelectedSlice, isSelected, sliceIndex }) => {
  const { colors } = useTheme();
  const onPress = () => {
    if (!isNullOrUndefined(changeSelectedSlice)) {
      changeSelectedSlice(sliceIndex, false);
    }
  };

  return (
    <TouchableNativeFeedback onPress={onPress} viewContainerStyle={STYLES.touchableOpacityContainer}>
      <View
        style={[
          STYLES.labelContainer,
          isSelected
            ? {
                borderRadius: GLOBAL_CONSTANTS.BORDER_RADIUS,
                backgroundColor: colors?.backgroundSelection
              }
            : null
        ]}
      >
        <View style={[STYLES.pieSliceDot, { backgroundColor: label?.svg?.fill }]} />
        <Text style={TYPOGRAPHY.subheading}>{label?.key}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Labels = ({ dataPoints, selectedSlice, changeSelectedSlice, isLoading }) => {
  if (isLoading) {
    return <Skeleton style={STYLES.skeleton} />;
  }

  return (
    <ScrollView
      contentContainerStyle={STYLES.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={STYLES.container}
    >
      {(dataPoints ?? []).map((d, i) => (
        <Label
          label={d}
          key={d?.key}
          isSelected={i === selectedSlice}
          sliceIndex={i}
          changeSelectedSlice={changeSelectedSlice}
        />
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
  touchableOpacityContainer: { marginRight: 0, flexGrow: 1 },
  skeleton: { height: 50, marginTop: GLOBAL_CONSTANTS.MD_MARGIN }
});

export default Labels;
