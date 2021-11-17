import React, { useState } from "react";
import { connect } from "react-redux";
import { selectSortByFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { GLOBAL_STYLES } from "../../../../styles";
import { FilterBadge } from "../../../../shared-components";

const SortByFilter = ({ activeFilter, updateMarketFilters }) => {
  const onPress = () => {
    console.log("Sort By Filter clicked");
  };

  return (
    <FilterBadge
      label={`Sorting by ${activeFilter.label}`}
      onPress={onPress}
      containerStyle={{ marginRight: 10, flexGrow: 1 }}
    />
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectSortByFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortBy: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByFilter);
