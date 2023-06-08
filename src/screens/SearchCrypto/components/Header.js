import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { CloseIconButton, TextInput } from "../../../components";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import SearchCategory from "./SearchCategory";
import {
  selectTrendingSearches,
  selectRecentSearches,
  fetchSearchResults,
  selectIsLoadingRecentSearches,
  selectIsLoadingTrendingSearches
} from "../../../redux/market";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { TYPOGRAPHY } from "../../../styles";
import { GLOBAL_CONSTANTS } from "../../../constants";
import SCREEN_NAMES from "../../../navigators/screen-names";

const Header = ({
  searchByKeyword,
  trendingSearches,
  recentSearches,
  isLoadingTrendingSearches,
  isLoadingRecentSearches
}) => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const closeScreen = () => navigation?.navigate(SCREEN_NAMES.MARKET_OVERVIEW);

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
      {keyword === "" ? (
        <>
          <SearchCategory label="Trending" searches={trendingSearches} isLoading={isLoadingTrendingSearches} />
          <SearchCategory
            label="History"
            searches={recentSearches}
            onHeadingClick={clearRecentSearches}
            headingBtnLabel="Clear"
            isLoading={isLoadingRecentSearches}
          />
        </>
      ) : null}
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
  searchByKeyword: (keyword) => dispatch(fetchSearchResults(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
