import React, { useState } from "react";
import { connect } from "react-redux";
import { selectSortOrderFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { FilterBadge } from "../../../../shared-components";
import { useBottomSheet } from "../../../../hooks";
import { View, Text } from "react-native";

const SortOrderFilter = ({ activeFilter, updateMarketFilters }) => {
  const { openBottomSheet, BottomSheet } = useBottomSheet({ name: "sort-order-filters" });

  return (
    <>
      <FilterBadge
        label={`Sorting in ${activeFilter}`}
        onPress={openBottomSheet}
        containerStyle={{ marginRight: 10, flexGrow: 1 }}
      />
      <BottomSheet>
        <View style={{ flex: 1 }}>
          <Text>Awesome Sort Order</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectSortOrderFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortOrder: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortOrderFilter);
