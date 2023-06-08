import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { connect } from "react-redux";
import { GLOBAL_CONSTANTS } from "../../constants";
import { deleteTransaction, fetchHoldingOverview } from "../../redux/portfolio/portfolio.actions";
import {
  selectHoldingOverview,
  selectIsDeletingTransaction,
  selectIsLoadingHoldingOverview,
  selectTransactions
} from "../../redux/portfolio/portfolio.selectors";
import { AsyncFlatList } from "../../components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { Header, Transaction, TransactionDetailModal } from "./components";
import { useConfirmationModal, useHiddenFABOnScroll } from "../../hooks";
import SCREEN_NAMES from "../../navigators/screen-names";
import { isNullOrUndefined } from "../../utils";

const NUM_SKELETON_LOADERS = 5;

const renderSkeleton = ({ index }) => (
  <Transaction.Skeleton
    style={{
      marginBottom: index !== NUM_SKELETON_LOADERS - 1 ? GLOBAL_CONSTANTS.SM_MARGIN : 0
    }}
  />
);

const HoldingOverviewScreen = ({
  navigation,
  route,
  fetchOverview,
  isLoadingHoldingOverview,
  transactionsForHolding,
  holdingOverview,
  deleteTransaction,
  isDeletingTransaction
}) => {
  const goToAddTransaction = () =>
    navigation?.navigate(SCREEN_NAMES.ADD_EDIT_TRANSACTION, {
      selectedCoin: {
        id: holdingOverview?.coinId,
        symbol: holdingOverview?.coinSymbol,
        name: holdingOverview?.coinName,
        image: holdingOverview?.coinURL
      },
      startingScreen: SCREEN_NAMES.HOLDING_OVERVIEW
    });

  const goToEditTransaction = (transactionToUpdate) => {
    setSelectedTransaction(null);
    navigation?.navigate(SCREEN_NAMES.ADD_EDIT_TRANSACTION, {
      selectedCoin: {
        id: holdingOverview?.coinId,
        symbol: holdingOverview?.coinSymbol,
        name: holdingOverview?.coinName,
        image: holdingOverview?.coinURL
      },
      startingScreen: SCREEN_NAMES.HOLDING_OVERVIEW,
      transactionToUpdate
    });
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { scrollHandler, Fab: AddTransactionFab } = useHiddenFABOnScroll({
    icon: "plus",
    onFABClick: goToAddTransaction,
    accessibilityLabel: "Add Transaction"
  });
  const onDeleteTransactionSuccess = () => {
    closeDeleteConfirmationModal();
    setSelectedTransaction(null);
  };
  const onDeleteTransactionConfirm = () => {
    if (!isNullOrUndefined(selectedTransaction)) {
      deleteTransaction(selectedTransaction, onDeleteTransactionSuccess);
    }
  };
  const {
    openModal: openDeleteConfirmationModal,
    closeModal: closeDeleteConfirmationModal,
    ConfirmationModal: DeleteTransactionConfirmationModal
  } = useConfirmationModal(
    "Delete Transaction",
    `Are you sure you want to delete this transaction?`,
    onDeleteTransactionConfirm,
    isDeletingTransaction
  );

  const { coinId } = route.params;
  useEffect(() => {
    fetchOverview(coinId);
  }, [coinId]);

  useEffect(() => {
    if (!isNullOrUndefined(holdingOverview?.coinName) && !isNullOrUndefined(holdingOverview?.coinSymbol)) {
      navigation?.setOptions({ headerTitle: `${holdingOverview?.coinName} (${holdingOverview?.coinSymbol})` });
    }
  }, [holdingOverview]);

  const onTransactionSelect = (transaction) => {
    setSelectedTransaction(transaction);
  };
  const renderTransaction = ({ item, index }) => (
    <Transaction
      transaction={item}
      key={item?.id + index}
      onSelect={onTransactionSelect}
      holdingOverview={holdingOverview}
    />
  );

  return (
    <>
      <AsyncFlatList
        data={transactionsForHolding}
        isLoading={isLoadingHoldingOverview}
        numSkeletons={NUM_SKELETON_LOADERS}
        onScroll={scrollHandler}
        renderSkeleton={renderSkeleton}
        renderDataItem={renderTransaction}
        contentContainerStyle={GLOBAL_STYLES.screenContainer}
        ListHeaderComponent={
          <>
            <Header holdingOverview={holdingOverview} isLoading={isLoadingHoldingOverview} />
            <Text style={TYPOGRAPHY.headline}>Transactions</Text>
            <TransactionDetailModal
              transaction={selectedTransaction}
              hideDetails={() => setSelectedTransaction(null)}
              holdingOverview={holdingOverview}
              onDelete={openDeleteConfirmationModal}
              onEdit={goToEditTransaction}
            />
            <DeleteTransactionConfirmationModal isDismissable={false} />
          </>
        }
      />
      {!isNullOrUndefined(holdingOverview) ? <AddTransactionFab /> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoadingHoldingOverview: selectIsLoadingHoldingOverview(state),
  holdingOverview: selectHoldingOverview(state),
  transactionsForHolding: selectTransactions(state),
  isDeletingTransaction: selectIsDeletingTransaction(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (coinId) => dispatch(fetchHoldingOverview(coinId)),
  deleteTransaction: (transaction, onSuccess) => dispatch(deleteTransaction(transaction, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(HoldingOverviewScreen);
