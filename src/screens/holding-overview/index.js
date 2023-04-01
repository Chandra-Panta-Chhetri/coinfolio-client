import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../constants";
import { startDeletingTransaction, startHoldingOverviewFetch } from "../../redux/portfolio/portfolio.actions";
import {
  selectHoldingOverview,
  selectIsDeletingTransaction,
  selectIsLoadingHoldingOverview,
  selectTransactions
} from "../../redux/portfolio/portfolio.selectors";
import { AsyncFlatList, ConfirmationDialog } from "../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Header, Transaction, TransactionDetail } from "./components";
import { useHiddenFABOnScroll } from "../../hooks";

const NUM_SKELETON = 5;

const renderSkeleton = ({ index }) => (
  <Transaction.Skeleton
    style={{
      marginBottom: index !== NUM_SKELETON - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0
    }}
  />
);

const HoldingOverviewScreen = ({
  navigation,
  route,
  fetchOverview,
  isLoadingOverview,
  transactions,
  summary,
  deleteTransaction,
  isDeletingTransaction
}) => {
  const goToAddTransaction = () =>
    navigation.navigate("AddTransaction", {
      selectedCoin: {
        id: summary?.coinId,
        symbol: summary?.coinSymbol,
        name: summary?.coinName,
        image: summary?.coinURL
      },
      startingScreen: "HoldingOverview"
    });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDeleteTransactionShown, setIsDeleteTransactionShown] = useState(false);
  const { scrollHandler, Fab: AddTransactionFab } = useHiddenFABOnScroll({
    icon: "plus",
    onFABClick: goToAddTransaction,
    accessibilityLabel: "Add Transaction"
  });
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

  const onDeleteTransactionSuccess = () => {
    hideTransactionDeleteModal();
    setSelectedTransaction(null);
  };

  const onDeleteConfirm = () => {
    if (selectedTransaction !== null) {
      deleteTransaction(selectedTransaction, onDeleteTransactionSuccess);
    }
  };

  const hideTransactionDeleteModal = () => setIsDeleteTransactionShown(false);
  const openTransactionDeleteModal = () => setIsDeleteTransactionShown(true);

  return (
    <>
      <AsyncFlatList
        data={transactions}
        isLoading={isLoadingOverview}
        numSkeletons={NUM_SKELETON}
        onScroll={scrollHandler}
        ListHeaderComponent={
          <>
            <Header summary={summary} isLoading={isLoadingOverview} />
            <Text style={TYPOGRAPHY.headline}>Transactions</Text>
            <TransactionDetail
              transaction={selectedTransaction}
              hideDetails={() => setSelectedTransaction(null)}
              summary={summary}
              onDelete={openTransactionDeleteModal}
            />
            <ConfirmationDialog
              isVisible={isDeleteTransactionShown}
              onConfirmCb={onDeleteConfirm}
              confirmationTitle="Delete Transaction"
              confirmationText={`Are you sure you want to delete this transaction?`}
              hideDialog={hideTransactionDeleteModal}
              isLoading={isDeletingTransaction}
              isDismissable={false}
            />
          </>
        }
        renderSkeleton={renderSkeleton}
        renderDataItem={renderTransaction}
        contentContainerStyle={GLOBAL_STYLES.screenContainer}
      />
      {summary !== null ? <AddTransactionFab /> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoadingOverview: selectIsLoadingHoldingOverview(state),
  summary: selectHoldingOverview(state),
  transactions: selectTransactions(state),
  isDeletingTransaction: selectIsDeletingTransaction(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (coinId) => dispatch(startHoldingOverviewFetch(coinId)),
  deleteTransaction: (transaction, onSuccess) => dispatch(startDeletingTransaction(transaction, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(HoldingOverviewScreen);
