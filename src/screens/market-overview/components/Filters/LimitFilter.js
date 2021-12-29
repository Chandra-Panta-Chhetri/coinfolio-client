import React, { useState } from "react";
import { connect } from "react-redux";
import { selectLimitFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { FilterBadge } from "../../../../shared-components";
import { useBottomSheet } from "../../../../hooks";
import { View, Text } from "react-native";

const LimitFilter = ({ activeFilter, updateMarketFilters }) => {
  const { openBottomSheet, BottomSheet } = useBottomSheet({ name: "limit-filters" });

  return (
    <>
      <FilterBadge
        label={`Limit to ${activeFilter.label}`}
        onPress={openBottomSheet}
        containerStyle={{ marginRight: 10, flexGrow: 1 }}
      />
      <BottomSheet>
        <View style={{ flex: 1 }}>
          <Text>Awesome Limit</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectLimitFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortOrder: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LimitFilter);
