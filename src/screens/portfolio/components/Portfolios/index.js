import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeActivePortfolio,
  selectActivePortfolio,
  selectIsLoadingUserPortfolios,
  selectIsUpdatingUserPortfolios,
  selectUserPortfolios,
  addNewPortfolio,
  deletePortfolio,
  updatePortfolio,
  fetchUserPortfolios
} from "../../../../redux/portfolio";
import { Button } from "../../../../components";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import ListOfPortfolios from "./ListOfPortfolios";
import AddPortfolioModal from "./AddPortfolioModal";
import { StyleSheet } from "react-native";
import { isNullOrUndefined } from "../../../../utils";
import { TYPOGRAPHY } from "../../../../styles";
import { useConfirmationModal } from "../../../../hooks";

const EditPortfolioModal = AddPortfolioModal;

const Portfolios = ({
  portfolios,
  isLoadingPortfolios,
  fetchPortfolios,
  activePortfolio,
  isAddingEditingOrDeletingPortfolio,
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  changeActivePortfolio,
  navigation
}) => {
  const [isAddPortfolioShown, setIsAddPortfolioShown] = useState(false);
  const [isEditPortfolioShown, setIsEditPortfolioShown] = useState(false);
  const [portfolioToEditOrDelete, setPortfolioToEditOrDelete] = useState(null);

  const onPortfolioDeleteConfirm = () => {
    if (!isNullOrUndefined(portfolioToEditOrDelete)) {
      deletePortfolio(portfolioToEditOrDelete?.id, closeDeletePortfolioModal);
    }
  };

  const {
    openModal: openDeletePortfolioModal,
    closeModal: closeDeletePortfolioModal,
    ConfirmationModal: DeletePortfolioConfirmationModal
  } = useConfirmationModal(
    "Delete Portfolio",
    `Are you sure you want to delete ${portfolioToEditOrDelete?.nickname}? All transactions will also be deleted.`,
    onPortfolioDeleteConfirm,
    isAddingEditingOrDeletingPortfolio
  );

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (!isNullOrUndefined(portfolios) && portfolios?.length > 0 && isNullOrUndefined(activePortfolio)) {
      changeActivePortfolio(portfolios[0]);
    }
  }, [portfolios]);

  const changeSelectedPortfolio = (selectedPortfolio) => {
    if (
      !isNullOrUndefined(activePortfolio) &&
      !isNullOrUndefined(selectedPortfolio) &&
      activePortfolio?.id !== selectedPortfolio?.id
    ) {
      changeActivePortfolio(selectedPortfolio);
      navigation?.closeDrawer();
    }
  };

  const openAddPortfolioModal = () => setIsAddPortfolioShown(true);
  const hideAddPortfolioModal = () => setIsAddPortfolioShown(false);
  const openEditPortfolioModal = () => setIsEditPortfolioShown(true);
  const hideEditPortfolioModal = () => setIsEditPortfolioShown(false);

  const onUpdatePortfolioSubmit = (updatedPortfolio) => {
    Keyboard.dismiss();
    if (!isNullOrUndefined(portfolioToEditOrDelete)) {
      updatePortfolio(updatedPortfolio, portfolioToEditOrDelete?.id, hideEditPortfolioModal);
    }
  };

  const onCreatePortfolioSubmit = (portfolio) => {
    Keyboard.dismiss();
    createPortfolio(portfolio, hideAddPortfolioModal);
  };

  const showEditModal = (portfolio) => {
    setPortfolioToEditOrDelete(portfolio);
    openEditPortfolioModal();
  };

  const showDeleteModal = (portfolio) => {
    setPortfolioToEditOrDelete(portfolio);
    openDeletePortfolioModal();
  };

  return (
    <>
      <DrawerContentScrollView>
        <Text style={STYLES.title}>Select a Portfolio</Text>
        <ListOfPortfolios
          portfolios={portfolios}
          onEdit={showEditModal}
          onDelete={showDeleteModal}
          onSelect={changeSelectedPortfolio}
          selectedPortfolio={activePortfolio}
          isLoading={isLoadingPortfolios}
        />
      </DrawerContentScrollView>
      <Button
        mode="contained"
        style={STYLES.addPortfolioButton}
        label={"Add New Portfolio"}
        onPress={openAddPortfolioModal}
      >
        <AntDesign name="plus" size={GLOBAL_CONSTANTS.ICON_SIZE} />
      </Button>
      <AddPortfolioModal
        isVisible={isAddPortfolioShown}
        onDismiss={hideAddPortfolioModal}
        onSubmit={onCreatePortfolioSubmit}
        isLoading={isAddingEditingOrDeletingPortfolio}
      />
      <EditPortfolioModal
        isVisible={isEditPortfolioShown}
        onDismiss={hideEditPortfolioModal}
        onSubmit={onUpdatePortfolioSubmit}
        isLoading={isAddingEditingOrDeletingPortfolio}
        portfolioToEdit={portfolioToEditOrDelete}
      />
      <DeletePortfolioConfirmationModal />
    </>
  );
};

const STYLES = StyleSheet.create({
  addPortfolioButton: {
    borderRadius: 0
  },
  title: {
    ...TYPOGRAPHY.title,
    textAlign: "center",
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapStateToProps = (state) => ({
  portfolios: selectUserPortfolios(state),
  isLoadingPortfolios: selectIsLoadingUserPortfolios(state),
  isAddingEditingOrDeletingPortfolio: selectIsUpdatingUserPortfolios(state),
  activePortfolio: selectActivePortfolio(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchPortfolios: () => dispatch(fetchUserPortfolios()),
  createPortfolio: (portfolio, onSuccess) => dispatch(addNewPortfolio(portfolio, onSuccess)),
  updatePortfolio: (portfolio, portfolioId, onSuccess) => dispatch(updatePortfolio(portfolio, portfolioId, onSuccess)),
  deletePortfolio: (portfolioId, onSuccess) => dispatch(deletePortfolio(portfolioId, onSuccess)),
  changeActivePortfolio: (portfolio) => dispatch(changeActivePortfolio(portfolio))
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolios);
