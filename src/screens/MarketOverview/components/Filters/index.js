import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Filter from "./Filter";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { connect } from "react-redux";
import { selectMarketFilters, updateFilters } from "../../../../redux/market";
import MARKET_OVERVIEW_FILTERS from "../../filters";

const Filters = ({ activeMarketFilters, updateMarketFilters }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={STYLES.container}>
    <Filter
      options={MARKET_OVERVIEW_FILTERS.SORT_BY.OPTIONS}
      label={`Sorting by ${activeMarketFilters?.sortBy?.label}`}
      selectedOption={activeMarketFilters?.sortBy}
      customStyles={STYLES.filterContainer}
      onSelect={(selectedVal) => updateMarketFilters({ sortBy: selectedVal })}
      name="sort-by-filter"
    />
    <Filter
      options={MARKET_OVERVIEW_FILTERS.SORT_ORDER.OPTIONS}
      label={`Sorting in ${activeMarketFilters?.sortOrder?.label}`}
      customStyles={STYLES.filterContainer}
      selectedOption={activeMarketFilters?.sortOrder}
      onSelect={(selectedVal) => updateMarketFilters({ sortOrder: selectedVal })}
      name="sort-order-filter"
    />
    <Filter
      options={MARKET_OVERVIEW_FILTERS.SHOW_ONLY.OPTIONS}
      label={`Showing ${activeMarketFilters?.showOnly?.label}`}
      selectedOption={activeMarketFilters?.showOnly}
      customStyles={STYLES.flexGrow}
      onSelect={(selectedVal) => updateMarketFilters({ showOnly: selectedVal })}
      name="show-only-filter"
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
  activeMarketFilters: selectMarketFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  updateMarketFilters: (filter) => dispatch(updateFilters(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
