import React from "react";
import { connect } from "react-redux";
import { selectSortByFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { GLOBAL_STYLES } from "../../../../styles";
import { FilterBadge, TouchableSelectOption } from "../../../../shared-components";
import { View, Text } from "react-native";
import { useBottomSheet } from "../../../../hooks";
import { MARKET_OVERVIEW_CONSTANTS } from "../../../../constants";

const SortByFilter = ({ activeFilter, updateMarketFilters }) => {
  const { openBottomSheet, BottomSheet } = useBottomSheet({ name: "sort-by-filters" });

  return (
    <>
      <FilterBadge
        label={`Sorting by ${activeFilter.label}`}
        onPress={openBottomSheet}
        containerStyle={{ marginRight: 10, flexGrow: 1 }}
      />
      <BottomSheet>
        {MARKET_OVERVIEW_CONSTANTS.SORT_BY.FILTERS.map((f) => (
          <TouchableSelectOption
            label={f.label}
            onSelect={() => {
              updateMarketFilters(f);
            }}
            isSelected={activeFilter.value === f.value}
            key={f.value}
          />
        ))}
      </BottomSheet>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectSortByFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (filter) => dispatch(updateFilters({ sortBy: filter }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByFilter);
