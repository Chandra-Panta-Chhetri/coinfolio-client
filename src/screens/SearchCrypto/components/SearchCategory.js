import React from "react";
import { StyleSheet, View } from "react-native";
import { TYPOGRAPHY } from "../../../styles";
import { Text } from "react-native-paper";
import SearchResult from "./SearchResult";
import { Button } from "../../../components";
import { GLOBAL_CONSTANTS } from "../../../constants";
import MARKET_OVERVIEW_FILTERS from "../../MarketOverview/filters";
import { isNullOrUndefined } from "../../../utils";

const DUMMY_SKELETON_LOADERS_ARRAY = Array(MARKET_OVERVIEW_FILTERS.NUM_SKELETON_LOADERS).fill("1");

const SearchCategory = ({ label, searches, onHeadingClick, headingBtnLabel, isLoading }) => {
  return (
    <View style={STYLES.container}>
      <View style={STYLES.header}>
        <Text style={[TYPOGRAPHY.subheading]}>{label}</Text>
        {!isNullOrUndefined(onHeadingClick) ? (
          <Button compact onPress={onHeadingClick} label={headingBtnLabel} />
        ) : null}
      </View>
      <View>
        {!isLoading
          ? (searches ?? []).map((s, i) => <SearchResult key={s?.id + i} search={s} />)
          : DUMMY_SKELETON_LOADERS_ARRAY.map((_, i) => (
              <SearchResult.Skeleton
                key={i}
                customStyles={{
                  marginBottom: i !== DUMMY_SKELETON_LOADERS_ARRAY.length - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0
                }}
              />
            ))}
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  header: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default SearchCategory;
