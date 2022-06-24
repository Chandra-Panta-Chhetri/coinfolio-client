import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import BottomSheetFilter from "./BottomSheetFilter";
import { GLOBAL_CONSTANTS, MARKET_OVERVIEW_CONSTANTS } from "../../../../constants";
import { connect } from "react-redux";
import { selectMarketFilters, updateFilters } from "../../../../redux/market";
import { GLOBAL_STYLES } from "../../../../styles";

const Filters = ({ activeFilters, updateMarketFilters }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={STYLES.container}>
    <BottomSheetFilter
      filters={MARKET_OVERVIEW_CONSTANTS.SORT_BY.FILTERS}
      filterLabel={`Sorting by ${activeFilters.sortBy.label}`}
      activeFilter={activeFilters.sortBy}
      filterStyles={STYLES.filterContainer}
      onFilterSelect={(selectedVal) => updateMarketFilters({ sortBy: selectedVal })}
      bottomSheetKey="sort-by-filter"
    />
    <BottomSheetFilter
      filters={MARKET_OVERVIEW_CONSTANTS.SORT_ORDER.FILTERS}
      filterLabel={`Sorting in ${activeFilters.sortOrder.label}`}
      filterStyles={STYLES.filterContainer}
      activeFilter={activeFilters.sortOrder}
      onFilterSelect={(selectedVal) => updateMarketFilters({ sortOrder: selectedVal })}
      bottomSheetKey="sort-order-filter"
    />
    <BottomSheetFilter
      filters={MARKET_OVERVIEW_CONSTANTS.SHOW_ONLY.FILTERS}
      filterLabel={`Showing ${activeFilters.showOnly.label}`}
      activeFilter={activeFilters.showOnly}
      filterStyles={STYLES.flexGrow}
      onFilterSelect={(selectedVal) => updateMarketFilters({ showOnly: selectedVal })}
      bottomSheetKey="show-only-filter"
    />
  </ScrollView>
);

const STYLES = StyleSheet.create({
  container: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN,
    flexGrow: 1
  },
  filterContainer: { marginRight: GLOBAL_CONSTANTS.MD_MARGIN, flexGrow: 1 },
  flexGrow: {
    flexGrow: 1
  }
});

const mapStateToProps = (state) => ({
  activeFilters: selectMarketFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (filter) => dispatch(updateFilters(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
