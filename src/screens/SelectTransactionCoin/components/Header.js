import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../../constants";
import { fetchTransactionCoins } from "../../../redux/portfolio/portfolio.actions";
import { SearchInput } from "../../../components";

const Header = ({ fetchSelectableCoins }) => {
  const onSearchChange = (search) => {
    if (search !== "") {
      fetchSelectableCoins({ search });
    } else {
      fetchSelectableCoins();
    }
  };

  return (
    <View style={STYLES.search}>
      <SearchInput placeholder="BTC/Bitcoin" onChange={onSearchChange} />
    </View>
  );
};

const STYLES = StyleSheet.create({
  search: {
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchSelectableCoins: (query) => dispatch(fetchTransactionCoins(query))
});

export default connect(null, mapDispatchToProps)(Header);
