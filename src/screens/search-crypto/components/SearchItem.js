import React from "react";
import { ShortCoinDetails } from "../../../shared-components";
import { useNavigation } from "@react-navigation/native";

const SearchItem = ({ search, containerStyles = {} }) => {
  const navigation = useNavigation();
  const { image, name, symbol, id } = search;

  const onPress = () => navigation.navigate("AssetDetail", { image, name, symbol, id });

  return <ShortCoinDetails coin={search} onPress={onPress} containerStyles={containerStyles} />;
};

export default SearchItem;
