import React from "react";
import { ShortCoinDetails, Skeleton } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import SCREEN_NAMES from "../../../navigators/screen-names";

function SearchResult({ search, containerStyles }) {
  const navigation = useNavigation();
  const { image, name, symbol, id } = search;

  const goToAssetDetails = () => navigation?.navigate(SCREEN_NAMES.ASSET_DETAIL, { image, name, symbol, id });

  return <ShortCoinDetails coin={search} onPress={goToAssetDetails} containerStyles={containerStyles} />;
}

SearchResult.Skeleton = ({ customStyles }) => <Skeleton style={[STYLES.searchSkeleton, customStyles]} />;

const STYLES = StyleSheet.create({
  searchSkeleton: {
    width: "100%",
    height: 60
  }
});

export default SearchResult;
