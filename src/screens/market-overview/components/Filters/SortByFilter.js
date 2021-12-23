import React from "react";
import { connect } from "react-redux";
import { selectSortByFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { GLOBAL_STYLES } from "../../../../styles";
import { FilterBadge } from "../../../../shared-components";
import { View, Text } from "react-native";
import { useBottomSheet } from "../../../../hooks";

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
        <View style={{ flex: 1 }}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectSortByFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortBy: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByFilter);
