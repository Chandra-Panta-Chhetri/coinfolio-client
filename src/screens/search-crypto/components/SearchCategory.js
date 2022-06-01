import React from "react";
import { StyleSheet, View } from "react-native";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { Text } from "react-native-paper";
import SearchItem from "./SearchItem";
import { Skeleton, Button } from "../../../shared-components";
import { MARKET_OVERVIEW_CONSTANTS } from "../../../constants";

const DUMMY_SKELETON_ARRAY = Array(MARKET_OVERVIEW_CONSTANTS.NUM_SEARCH_RESULT_SKELETONS).fill("1");

const SearchCategory = ({ label, searches, onHeadingClick, headingBtnLabel, isLoading }) => {
  const onClick = () => {
    onHeadingClick && onHeadingClick();
  };

  return (
    <View style={STYLES.container}>
      <View style={STYLES.header}>
        <Text style={[TYPOGRAPHY.subheading]}>{label}</Text>
        {onHeadingClick && <Button compact onPress={onClick} label={headingBtnLabel} />}
      </View>
      <View>
        {!isLoading
          ? searches.map((s, i) => <SearchItem key={s.id + i} search={s} />)
          : DUMMY_SKELETON_ARRAY.map((_, i) => (
              <Skeleton
                key={i}
                style={[
                  STYLES.searchResultSkeleton,
                  {
                    marginBottom: i !== DUMMY_SKELETON_ARRAY.length - 1 ? GLOBAL_STYLES.smMarginBottom.marginBottom : 0
                  }
                ]}
              />
            ))}
      </View>
    </View>
  );
};

const STYLES = StyleSheet.create({
  container: {},
  header: {
    ...GLOBAL_STYLES.lgMarginBottom,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  searchResultSkeleton: {
    width: "100%",
    height: 50
  }
});

export default SearchCategory;
