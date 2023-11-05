import React, { useEffect } from "react";
import { connect } from "react-redux";
import { InfiniteScroll } from "../../components";
import { GLOBAL_STYLES } from "../../styles";
import { CurrencyItem, CurrencyItemSkeleton } from "./components";
import {
  selectCurrencies,
  selectIsLoadingCurrencies,
  selectHasMoreCurrencies,
  selectIsLoadingMoreCurrencies,
  fetchCurrencies,
  fetchMoreCurrencies
} from "../../redux/currency";
import { selectCurrencyCode } from "../../redux/preferences";

const NUM_SKELETON_LOADERS = 10;

const renderCurrencySkeleton = () => <CurrencyItemSkeleton containerStyle={GLOBAL_STYLES.cardMargin} />;

function SelectCurrencyScreen({
  isLoadingCurrencies,
  currencies,
  isLoadingMoreCurrencies,
  hasMoreCurrenciesToFetch,
  fetchCurrencies,
  fetchMoreCurrencies,
  selectedCurrencyCode
}) {
  useEffect(() => {
    fetchCurrencies();
  }, []);

  const renderCurrencyItem = ({ item, index }) => (
    <CurrencyItem key={item?.code + index} currency={item} isSelected={item?.code === selectedCurrencyCode} />
  );

  return (
    <InfiniteScroll
      isLoading={isLoadingCurrencies}
      data={currencies}
      numSkeletons={NUM_SKELETON_LOADERS}
      isLoadingMore={isLoadingMoreCurrencies}
      hasMoreToFetch={hasMoreCurrenciesToFetch}
      renderDataItem={renderCurrencyItem}
      onEndReached={fetchMoreCurrencies}
      renderSkeleton={renderCurrencySkeleton}
    />
  );
}

const mapStateToProps = (state) => ({
  isLoadingCurrencies: selectIsLoadingCurrencies(state),
  currencies: selectCurrencies(state),
  isLoadingMoreCurrencies: selectIsLoadingMoreCurrencies(state),
  hasMoreCurrenciesToFetch: selectHasMoreCurrencies(state),
  selectedCurrencyCode: selectCurrencyCode(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  fetchMoreCurrencies: () => dispatch(fetchMoreCurrencies())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrencyScreen);
