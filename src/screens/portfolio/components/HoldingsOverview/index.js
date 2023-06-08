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
    height: 80
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

const HoldingsOverview = ({ holdings, isLoadingPortfolioOverview, deleteHolding, isDeletingHolding }) => {
  const [sortCriteria, setSortCriteria] = useState({
    columnToSortBy: tableHeadings[0]?.sortByField,
    sortAscending: false
  });
  const [sortedHoldings, setSortedHoldings] = useState(holdings);
  const [visibleColumn, setVisibleColumn] = useState(SELECT_VISIBLE_COLUMNS[0]?.value);
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
    const sortInAscending = columnToSortBy === sortByField ? !sortAscending : true;
    const newSortedHoldings = [...sortedHoldings];
    newSortedHoldings.sort((a1, a2) => {
      if (typeof a1[sortByField] === typeof "") {
        return sortInAscending
          ? a1[sortByField].localeCompare(a2[sortByField])
          : a2[sortByField].localeCompare(a1[sortByField]);
      } else {
        return sortInAscending ? a1[sortByField] - a2[sortByField] : a2[sortByField] - a1[sortByField];
      }
    });
    setSortedHoldings(newSortedHoldings);
    setSortCriteria({
      columnToSortBy: sortByField,
      sortAscending: sortInAscending
    });
  };

  useEffect(() => {
    setSortedHoldings(holdings);
  }, [holdings]);

  const onVisibleColumnSelect = (selectedColName) => {
    setVisibleColumn(selectedColName);
  };

  if (isLoadingPortfolioOverview) {
    return <Skeleton style={STYLES.skeleton} />;
  }

  return (
    <View>
      <Text style={TYPOGRAPHY.headline}>Holdings</Text>
      <SelectVisibleColumn onSelect={onVisibleColumnSelect} />
      <DataTable>
        <DataTable.Header style={STYLES.tableHeadings}>
          {tableHeadings.map((heading) => {
            const shouldSkipHeading =
              (visibleColumn !== HOLDINGS_COLUMN.label && heading?.label === HOLDINGS_COLUMN.label) ||
              (visibleColumn !== PL_COLUMN.label && heading?.label === PL_COLUMN.label);
            if (shouldSkipHeading) {
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
        {sortedHoldings.map((holding) => (
          <TableRow
            key={holding?.coinId}
            onDelete={showDeleteConfirmation}
            holding={holding}
            visibleColumn={visibleColumn}
          />
        ))}
      </DataTable>
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
