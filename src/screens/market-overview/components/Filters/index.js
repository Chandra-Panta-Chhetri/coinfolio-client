import React, { useState } from "react";
import { ScrollView } from "react-native";
import LimitFilter from "./LimitFilter";
import ShowOnlyFilter from "./ShowOnlyFilter";
import SortByFilter from "./SortByFilter";

const Filters = () => {
  const [filters, setFilters] = useState({
    limit: 100,
    sortBy: "",
    showOnly: "",
    sortOrder: "asc"
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <SortByFilter />
      <LimitFilter />
      <ShowOnlyFilter />
    </ScrollView>
  );
};

export default Filters;
