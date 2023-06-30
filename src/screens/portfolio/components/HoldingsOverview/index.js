import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsDeletingHolding,
  selectIsLoadingPortfolioOverview,
  selectPortfolioHoldings,
  deleteHolding
} from "../../../../redux/portfolio";
import { TYPOGRAPHY } from "../../../../styles";
import { useConfirmationModal } from "../../../../hooks";
import SelectVisibleColumn, { HOLDINGS_COLUMN, PL_COLUMN, SELECT_VISIBLE_COLUMNS } from "./SelectVisibleColumn";
import TableHeading from "./TableHeading";
import { isNullOrUndefined } from "../../../../utils";
import TableRow from "./TableRow";
import { Skeleton } from "../../../../components";
import NoHoldings from "./NoHoldings";

const STYLES = StyleSheet.create({
  tableHeadings: { borderBottomWidth: 0 },
  tableHeading: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  rightAlignedTableHeading: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "row"
  },
  skeleton: {
    width: "100%",
    height: 240
  }
});

const tableHeadings = [
  {
    label: "Asset",
    style: STYLES.tableHeading,
    sortByField: "coinName"
  },
  {
    label: "Price",
    style: STYLES.rightAlignedTableHeading,
    sortByField: "priceUSD"
  },
  {
    label: HOLDINGS_COLUMN.label,
    style: STYLES.rightAlignedTableHeading,
    sortByField: "totalValue"
  },
  {
    label: PL_COLUMN.label,
    style: STYLES.rightAlignedTableHeading,
    sortByField: "profitLoss"
  }
];

const sortHoldings = (holdings, sortCriteria) => {
  const { columnToSortBy, sortAscending } = sortCriteria;
  const sortedHoldings = [...holdings];
  sortedHoldings.sort((a1, a2) => {
    switch (columnToSortBy) {
      case "coinName":
        return sortAscending
          ? a1[columnToSortBy].localeCompare(a2[columnToSortBy])
          : a2[columnToSortBy].localeCompare(a1[columnToSortBy]);
      case "priceUSD":
      case "profitLoss":
        return sortAscending
          ? a1[columnToSortBy]?.value - a2[columnToSortBy]?.value
          : a2[columnToSortBy]?.value - a1[columnToSortBy]?.value;
      case "totalValue":
        return sortAscending ? +a1[columnToSortBy] - +a2[columnToSortBy] : +a2[columnToSortBy] - +a1[columnToSortBy];
      default:
        return sortAscending
          ? a1[columnToSortBy].localeCompare(a2[columnToSortBy])
          : a2[columnToSortBy].localeCompare(a1[columnToSortBy]);
    }
  });
  return sortedHoldings;
};

const HoldingsOverview = ({ holdings, isLoadingPortfolioOverview, deleteHolding, isDeletingHolding }) => {
  const [sortCriteria, setSortCriteria] = useState({
    columnToSortBy: tableHeadings[0]?.sortByField,
    sortAscending: false
  });
  const [sortedHoldings, setSortedHoldings] = useState(holdings);
  const [visibleColumn, setVisibleColumn] = useState(SELECT_VISIBLE_COLUMNS[0]?.label);
  const [holdingToDelete, setHoldingToDelete] = useState(null);

  const { columnToSortBy, sortAscending } = sortCriteria;
  const onHoldingDeleteConfirm = () => {
    if (!isNullOrUndefined(holdingToDelete)) {
      deleteHolding(holdingToDelete?.coinId, closeDeleteHoldingModal);
    }
  };
  const {
    openModal: openDeleteHoldingModal,
    closeModal: closeDeleteHoldingModal,
    ConfirmationModal: DeleteHoldingConfirmationModal
  } = useConfirmationModal(
    "Delete Holding",
    `Are you sure you want to remove ${holdingToDelete?.coinName} from this portfolio? All transactions will also be deleted.`,
    onHoldingDeleteConfirm,
    isDeletingHolding
  );

  const showDeleteConfirmation = (holding) => {
    setHoldingToDelete(holding);
    openDeleteHoldingModal();
  };

  const sortTable = (heading) => {
    const sortByField = heading?.sortByField;
    const newSortCriteria = {
      columnToSortBy: sortByField,
      sortAscending: columnToSortBy === sortByField ? !sortAscending : true
    };
    const newSortedHoldings = sortHoldings(sortedHoldings, newSortCriteria);
    setSortedHoldings(newSortedHoldings);
    setSortCriteria(newSortCriteria);
  };

  useEffect(() => {
    const newSortedHoldings = sortHoldings(holdings, sortCriteria);
    setSortedHoldings(newSortedHoldings);
  }, [holdings]);

  const onVisibleColumnSelect = (selectedColLabel) => {
    setVisibleColumn(selectedColLabel);
  };

  const hasNoHoldings = holdings?.length === 0;

  if (isLoadingPortfolioOverview) {
    return <Skeleton style={STYLES.skeleton} />;
  }

  return (
    <View>
      <Text style={TYPOGRAPHY.headline}>Holdings</Text>
      {hasNoHoldings ? (
        <NoHoldings />
      ) : (
        <>
          <SelectVisibleColumn onSelect={onVisibleColumnSelect} />
          <DataTable>
            <DataTable.Header style={STYLES.tableHeadings}>
              {tableHeadings.map((heading) => {
                const skipHeading =
                  !isNullOrUndefined(SELECT_VISIBLE_COLUMNS.find((col) => col?.label === heading?.label)) &&
                  visibleColumn !== heading?.label;
                if (skipHeading) {
                  return null;
                }

                return (
                  <TableHeading
                    onPress={sortTable}
                    heading={heading}
                    key={heading?.label}
                    columnToSortBy={columnToSortBy}
                    sortingInAscending={sortAscending}
                  />
                );
              })}
            </DataTable.Header>
            {sortedHoldings.map((holding, i) => (
              <TableRow
                key={holding?.coinId}
                onDelete={showDeleteConfirmation}
                holding={holding}
                visibleColumn={visibleColumn}
                isLast={i === sortedHoldings?.length - 1}
              />
            ))}
          </DataTable>
        </>
      )}
      <DeleteHoldingConfirmationModal />
    </View>
  );
};

const mapStateToProps = (state) => ({
  holdings: selectPortfolioHoldings(state),
  isLoadingPortfolioOverview: selectIsLoadingPortfolioOverview(state),
  isDeletingHolding: selectIsDeletingHolding(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteHolding: (coinId, onSuccess) => dispatch(deleteHolding(coinId, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(HoldingsOverview);
