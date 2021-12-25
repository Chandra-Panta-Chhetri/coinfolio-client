import React, { useState } from "react";
import { connect } from "react-redux";
import { selectShowOnlyFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { FilterBadge } from "../../../../shared-components";
import { useBottomSheet } from "../../../../hooks";
import { View, Text } from "react-native";

const ShowOnlyFilter = ({ activeFilter, updateMarketFilters }) => {
  const { openBottomSheet, BottomSheet } = useBottomSheet({ name: "show-only-filters" });

  return (
    <>
      <FilterBadge label={`Showing ${activeFilter}`} onPress={openBottomSheet} containerStyle={{ flexGrow: 1 }} />
      <BottomSheet>
        <View style={{ flex: 1 }}>
          <Text>Awesome Show Only</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectShowOnlyFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortOrder: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowOnlyFilter);
