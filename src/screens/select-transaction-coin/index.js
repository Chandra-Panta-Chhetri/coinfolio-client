import React, { useEffect } from "react";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../constants";
import { startTransactionCoinsFetch } from "../../redux/portfolio/portfolio.actions";
import { selectIsLoadingTransactionCoins, selectTransactionCoins } from "../../redux/portfolio/portfolio.selectors";
import { AsyncFlatList } from "../../shared-components";
import { GLOBAL_STYLES } from "../../styles";
import { Header, SelectableCoin } from "./components";

const NUM_COIN_SKELETONS = 6;
const renderSkeleton = ({ index }) => (
  <SelectableCoin.Skeleton
    style={{
      marginBottom: index !== NUM_COIN_SKELETONS - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0
    }}
  />
);
const renderDataItem = ({ item, index }) => <SelectableCoin coin={item} key={item?.id + index} />;

function SelectTransactionCoinScreen({ selectableCoins, fetchSelectableCoins, isLoadingCoins }) {
  useEffect(() => {
    fetchSelectableCoins();
  }, []);

  return (
    <AsyncFlatList
      isLoading={isLoadingCoins}
      data={selectableCoins}
      numSkeletons={NUM_COIN_SKELETONS}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
      ListHeaderComponent={<Header />}
      renderDataItem={renderDataItem}
      renderSkeleton={renderSkeleton}
    />
  );
}

const mapStateToProps = (state) => ({
  selectableCoins: selectTransactionCoins(state),
  isLoadingCoins: selectIsLoadingTransactionCoins(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchSelectableCoins: () => dispatch(startTransactionCoinsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTransactionCoinScreen);
