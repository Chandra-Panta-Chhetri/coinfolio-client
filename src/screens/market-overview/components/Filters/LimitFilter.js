import React, { useState } from "react";
import { connect } from "react-redux";
import { selectLimitFilter } from "../../../../redux/market/market.selectors";
import { updateFilters } from "../../../../redux/market/market.actions";
import { FilterBadge } from "../../../../shared-components";

const LimitFilter = ({ activeFilter, updateMarketFilters }) => {
  console.log(activeFilter);

  const onPress = () => {
    console.log("Limit Filter clicked");
  };

  return (
    <FilterBadge
      label={`Limit to`}
      onPress={onPress}
      containerStyle={{ marginRight: 10, flexGrow: 1 }}
    />
  );
};

const mapStateToProps = (state) => ({
  activeFilter: selectLimitFilter(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (val) => dispatch(updateFilters({ sortOrder: val }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LimitFilter);
