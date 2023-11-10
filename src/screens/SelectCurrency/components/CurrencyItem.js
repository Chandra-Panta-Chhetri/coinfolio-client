import React, { memo } from "react";
import { TouchableNativeFeedback, Skeleton } from "../../../components";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { isNullOrUndefined } from "../../../utils";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { changeCurrency } from "../../../redux/preferences";
import { AntDesign } from "@expo/vector-icons";

function CurrencyItem({ currency, containerStyle, isSelected, setCurrencyCode }) {
  const setCurrencyPreference = () => {
    if (!isSelected) {
      setCurrencyCode(currency?.code);
    }
  };
  const { colors } = useTheme();

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={STYLES.scrollContainer}>
      <TouchableNativeFeedback
        viewContainerStyle={[containerStyle, STYLES.touchableContainer]}
        onPress={setCurrencyPreference}
        delayPressIn={50}
      >
        <View style={STYLES.container}>
          <View style={STYLES.flexRowCenter}>
            <Text style={STYLES.code}>{currency?.code}</Text>
            <Text style={STYLES.fullName}>{currency?.full_name}</Text>
            {!isNullOrUndefined(currency?.currency_symbol) ? (
              <Text style={STYLES.symbol}>({currency?.currency_symbol})</Text>
            ) : null}
          </View>
          {isSelected ? (
            <View style={STYLES.flexRowCenter}>
              <AntDesign name="check" style={TYPOGRAPHY.subheading} color={colors.text} size={22} />
            </View>
          ) : null}
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  );
}

export const CurrencyItemSkeleton = ({ containerStyle }) => (
  <View style={[containerStyle]}>
    <Skeleton style={STYLES.infoSkeleton} />
  </View>
);

const STYLES = StyleSheet.create({
  infoSkeleton: {
    height: 50
  },
  scrollContainer: {
    flexGrow: 1
  },
  touchableContainer: {
    borderBottomWidth: 1,
    borderRadius: 0,
    flexGrow: 1
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center"
  },
  code: {
    ...TYPOGRAPHY.body2,
    marginRight: GLOBAL_CONSTANTS.LG_MARGIN
  },
  fullName: {
    ...TYPOGRAPHY.subheading
  },
  symbol: {
    ...TYPOGRAPHY.subheading,
    marginLeft: GLOBAL_CONSTANTS.MD_MARGIN
  }
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencyCode: (code) => dispatch(changeCurrency(code))
});

export default memo(connect(null, mapDispatchToProps)(CurrencyItem));
