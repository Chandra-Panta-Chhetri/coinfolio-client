import React, { useState } from "react";
import { ScrollView } from "react-native";
import LimitFilter from "./LimitFilter";
import ShowOnlyFilter from "./ShowOnlyFilter";
import SortByFilter from "./SortByFilter";
import SortOrderFilter from "./SortOrderFilter";

const Filters = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SortByFilter />
      <SortOrderFilter />
      <LimitFilter />
      <ShowOnlyFilter />
    </ScrollView>
  );
};

export default Filters;
