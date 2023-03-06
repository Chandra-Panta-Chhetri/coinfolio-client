import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeActivePortfolio,
  selectActivePortfolio,
  selectIsLoadingUserPortfolios,
  selectIsUpdatingUserPortfolios,
  selectUserPortfolios,
  startAddingNewPortfolio,
  startDeletingPortfolio,
  startUpdatingPortfolio,
  startUserPortfoliosFetch
} from "../../../../redux/portfolio";
import { Button, ConfirmationDialog } from "../../../../shared-components";
import Typography from "../../../../styles/Typography";
import { GLOBAL_CONSTANTS } from "../../../../constants";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import ListOfPortfolios from "./ListOfPortfolios";
import AddPortfolioModal from "./AddPortfolioModal";
import { StyleSheet } from "react-native";

const EditPortfolioModal = AddPortfolioModal;

const UserPortfolios = ({
  portfolios,
  isLoadingPortfolios,
  fetchPortfolios,
  activePortfolio,
  isUpdatingPortfolios,
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  changeActivePortfolio,
  navigation
}) => {
  const { colors, dark: isDarkMode } = useTheme();
  const [isAddPortfolioShown, setIsAddPortfolioShown] = useState(false);
  const [isEditPortfolioShown, setIsEditPortfolioShown] = useState(false);
  const [isDeletePortfolioShown, setIsDeletePortfolioShown] = useState(false);
  const [portfolioToEditOrDelete, setPortfolioToEditOrDelete] = useState(undefined);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (portfolios?.length > 0 && activePortfolio === null) {
      changeActivePortfolio(portfolios[0]);
    }
  }, [portfolios]);

  const changeSelectedPortfolio = (selectedPortfolio) => {
    if (activePortfolio?.id !== selectedPortfolio?.id) {
      changeActivePortfolio(selectedPortfolio);
    }
    navigation?.closeDrawer();
  };

  const openAddPortfolioModal = () => setIsAddPortfolioShown(true);
  const hideAddPortfolioModal = () => setIsAddPortfolioShown(false);
  const openEditPortfolioModal = () => setIsEditPortfolioShown(true);
  const hideEditPortfolioModal = () => setIsEditPortfolioShown(false);
  const openDeletePortfolioModal = () => setIsDeletePortfolioShown(true);
  const hideDeletePortfolioModal = () => setIsDeletePortfolioShown(false);

  const onUpdateSubmit = (updatedPortfolio) => {
    Keyboard.dismiss();
    console.log(portfolioToEditOrDelete);
    if (portfolioToEditOrDelete !== null) {
      updatePortfolio(updatedPortfolio, portfolioToEditOrDelete?.id, hideEditPortfolioModal);
    }
  };

  const onDeleteConfirm = () => {
    console.log(portfolioToEditOrDelete);
    if (portfolioToEditOrDelete !== null) {
      deletePortfolio(portfolioToEditOrDelete?.id, hideDeletePortfolioModal);
    }
  };

  const onAddSubmit = (portfolio) => {
    Keyboard.dismiss();
    createPortfolio(portfolio, hideAddPortfolioModal);
  };

  const onEditPress = (portfolio) => {
    console.log("EDIT ICON PRESSED", portfolio);
    setPortfolioToEditOrDelete(portfolio);
    openEditPortfolioModal();
  };

  const onDeletePress = (portfolio) => {
    setPortfolioToEditOrDelete(portfolio);
    openDeletePortfolioModal();
  };

  return (
    <>
      <DrawerContentScrollView>
        <Text style={STYLES.title}>Select a Portfolio</Text>
        <ListOfPortfolios
          portfolios={portfolios}
          onEdit={onEditPress}
          onDelete={onDeletePress}
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
        onSubmit={onAddSubmit}
        isLoading={isUpdatingPortfolios}
      />
      <EditPortfolioModal
        isVisible={isEditPortfolioShown}
        onDismiss={hideEditPortfolioModal}
        onSubmit={onUpdateSubmit}
        isLoading={isUpdatingPortfolios}
        portfolioToEdit={portfolioToEditOrDelete}
      />
      <ConfirmationDialog
        isVisible={isDeletePortfolioShown}
        onConfirmCb={onDeleteConfirm}
        confirmationTitle="Delete Portfolio"
        confirmationText={`Are you sure you want to delete ${portfolioToEditOrDelete?.nickname}? All transactions will also be deleted.`}
        hideDialog={hideDeletePortfolioModal}
        isLoading={isUpdatingPortfolios}
      />
    </>
  );
};

const STYLES = StyleSheet.create({
  addPortfolioButton: {
    borderRadius: 0
  },
  title: {
    ...Typography.title,
    textAlign: "center",
    marginBottom: GLOBAL_CONSTANTS.LG_MARGIN
  }
});

const mapStateToProps = (state) => ({
  portfolios: selectUserPortfolios(state),
  isLoadingPortfolios: selectIsLoadingUserPortfolios(state),
  isUpdatingPortfolios: selectIsUpdatingUserPortfolios(state),
  activePortfolio: selectActivePortfolio(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchPortfolios: () => dispatch(startUserPortfoliosFetch()),
  createPortfolio: (portfolio, onSuccess) => dispatch(startAddingNewPortfolio(portfolio, onSuccess)),
  updatePortfolio: (portfolio, portfolioId, onSuccess) =>
    dispatch(startUpdatingPortfolio(portfolio, portfolioId, onSuccess)),
  deletePortfolio: (portfolioId, onSuccess) => dispatch(startDeletingPortfolio(portfolioId, onSuccess)),
  changeActivePortfolio: (portfolio) => dispatch(changeActivePortfolio(portfolio))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPortfolios);
