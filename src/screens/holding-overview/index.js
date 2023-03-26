import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../constants";
import { startHoldingOverviewFetch } from "../../redux/portfolio/portfolio.actions";
import {
  selectHoldingOverview,
  selectIsLoadingHoldingOverview,
  selectTransactions
} from "../../redux/portfolio/portfolio.selectors";
import { AsyncFlatList } from "../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Header, Transaction, TransactionDetail } from "./components";

const NUM_SKELETON = 5;

const renderSkeleton = ({ index }) => (
  <Transaction.Skeleton
    style={{
      marginBottom: index !== NUM_SKELETON - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0
    }}
  />
);

const HoldingOverviewScreen = ({ navigation, route, fetchOverview, isLoadingOverview, transactions, summary }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { coinId } = route.params;
  useEffect(() => {
    fetchOverview(coinId);
  }, [coinId]);

  useEffect(() => {
    if (summary?.coinName !== undefined && summary?.coinSymbol !== undefined) {
      navigation.setOptions({ headerTitle: `${summary?.coinName} (${summary?.coinSymbol})` });
    }
  }, [summary]);
  const onTransactionSelect = (transaction) => {
    setSelectedTransaction(transaction);
  };
  const renderTransaction = ({ item, index }) => (
    <Transaction transaction={item} key={item?.id + index} onSelect={onTransactionSelect} summary={summary} />
  );

  return (
    <AsyncFlatList
      data={transactions}
      isLoading={isLoadingOverview}
      numSkeletons={NUM_SKELETON}
      ListHeaderComponent={
        <>
          <Header summary={summary} isLoading={isLoadingOverview} />
          <Text style={TYPOGRAPHY.headline}>Transactions</Text>
          <TransactionDetail
            transaction={selectedTransaction}
            hideDetails={() => setSelectedTransaction(null)}
            summary={summary}
          />
        </>
      }
      renderSkeleton={renderSkeleton}
      renderDataItem={renderTransaction}
      contentContainerStyle={GLOBAL_STYLES.screenContainer}
    />
  );
};

const mapStateToProps = (state) => ({
  isLoadingOverview: selectIsLoadingHoldingOverview(state),
  summary: selectHoldingOverview(state),
  transactions: selectTransactions(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (coinId) => dispatch(startHoldingOverviewFetch(coinId))
});

export default connect(mapStateToProps, mapDispatchToProps)(HoldingOverviewScreen);
