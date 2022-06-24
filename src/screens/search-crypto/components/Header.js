import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { CloseIconButton, TextInput } from "../../../shared-components";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import SearchCategory from "./SearchCategory";
import {
  selectTrendingSearches,
  selectRecentSearches,
  startSearchResultsFetch,
  selectIsLoadingRecentSearches,
  selectIsLoadingTrendingSearches
} from "../../../redux/market";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { TYPOGRAPHY, GLOBAL_STYLES } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";

const Header = ({
  searchByKeyword,
  trendingSearches,
  recentSearches,
  isLoadingTrendingSearches,
  isLoadingRecentSearches
}) => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const closeScreen = () => navigation.navigate("MarketOverview");

  const clearRecentSearches = () => {};

  const search = useCallback(
    debounce((searchTerm) => {
      searchByKeyword(searchTerm);
    }, 500),
    []
  );

  const onKeywordChange = (text) => {
    setKeyword(text);
    search(text);
  };

  return (
    <>
      <View style={STYLES.header}>
        <Text style={STYLES.heading}>Search</Text>
        <CloseIconButton onPress={closeScreen} />
      </View>
      <TextInput style={STYLES.searchBar} placeholder="BTC/Bitcoin" value={keyword} onChangeText={onKeywordChange} />
      {keyword === "" && (
        <SearchCategory label="Trending" searches={trendingSearches} isLoading={isLoadingTrendingSearches} />
      )}
      {keyword === "" && (
        <SearchCategory
          label="History"
          searches={recentSearches}
          onHeadingClick={clearRecentSearches}
          headingBtnLabel="Clear"
          isLoading={isLoadingRecentSearches}
        />
      )}
    </>
  );
};

const STYLES = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heading: {
    ...TYPOGRAPHY.display1
  },
  searchBar: { marginBottom: GLOBAL_CONSTANTS.LG_MARGIN }
});

const mapStateToProps = (state) => ({
  trendingSearches: selectTrendingSearches(state),
  recentSearches: selectRecentSearches(state),
  isLoadingRecentSearches: selectIsLoadingRecentSearches(state),
  isLoadingTrendingSearches: selectIsLoadingTrendingSearches(state)
});

const mapDispatchToProps = (dispatch) => ({
  searchByKeyword: (keyword) => dispatch(startSearchResultsFetch(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
