import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsDeletingHolding,
  selectIsLoadingPortfolioOverview,
  selectPortfolioHoldings,
  startDeletingHolding
} from "../../../redux/portfolio";
import { AntDesign } from "@expo/vector-icons";
import { PressableView, IconImage, DropDown, Button, TouchableNativeFeedback } from "../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { formatNumWorklet, formatPercentWorklet, getStylesBasedOnSign } from "../../../utils";
import { COLORS, GLOBAL_CONSTANTS } from "../../../constants";
import { useConfirmationDialog } from "../../../hooks";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const SwipeableActions = ({ holding, onDelete }) => {
  const onDeletePress = () => {
    if (onDelete !== undefined) {
      onDelete(holding);
    }
  };

  return (
    <View style={STYLES.swipeableActions}>
      <Button mode="contained" style={STYLES.deleteHoldingButton} buttonColor={COLORS.ERROR} onPress={onDeletePress}>
        <AntDesign name="delete" size={GLOBAL_CONSTANTS.ICON_SIZE} />
      </Button>
    </View>
  );
};

const STYLES = StyleSheet.create({
  dataHeader: { borderBottomWidth: 0 },
  dataRow: {
    paddingVertical: 8,
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopWidth: GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
  },
  deleteHoldingButton: {
    borderRadius: 0,
    justifyContent: "center"
  },
  swipeableActions: { display: "flex", flexDirection: "row" },
  flex: {
    flex: 1
  },
  marginRight: {
    marginRight: GLOBAL_CONSTANTS.MD_MARGIN
  },
  assetTableCell: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1.3
  },
  assetNameAndTicker: { marginLeft: GLOBAL_CONSTANTS.SM_MARGIN, flex: 1 },
  assetTableHeading: {
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
  sortArrow: {
    marginLeft: GLOBAL_CONSTANTS.SM_MARGIN
  }
});

const tableHeadings = [
  {
    label: "Asset",
    style: STYLES.assetTableHeading,
    sortByField: "coinName"
  },
  {
    label: "Price",
    style: STYLES.rightAlignedTableHeading,
    sortByField: "priceUSD"
  },
  {
    label: "Holdings",
    style: STYLES.rightAlignedTableHeading,
    sortByField: "totalValue"
  },
  {
    label: "P/L",
    style: STYLES.rightAlignedTableHeading,
    sortByField: "profitLoss"
  }
];

const VISIBLE_COLUMNS = [
  {
    label: "Holdings",
    value: "holdings"
  },
  {
    label: "P/L",
    value: "p/l"
  }
];

const HoldingsOverview = ({ holdings, isLoading, deleteHolding, isDeletingHolding }) => {
  const { colors } = useTheme();
  const [sortCriteria, setSortCriteria] = useState({
    columnToSortBy: "totalValue",
    sortAscending: false
  });
  const [sortedHoldings, setSortedHoldings] = useState([]);
  const [showPL, setShowPL] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(0);
  const [holdingToDelete, setHoldingToDelete] = useState(null);
  const { columnToSortBy, sortAscending } = sortCriteria;
  const onDeleteHoldingConfirm = () => {
    if (holdingToDelete !== undefined || holdingToDelete !== null) {
      deleteHolding(holdingToDelete?.coinId, closeDialog);
    }
  };
  const { openDialog, closeDialog, ConfirmationDialog } = useConfirmationDialog(
    "Delete Holding",
    `Are you sure you want to remove ${holdingToDelete?.coinName} from this portfolio? All transactions will also be deleted.`,
    onDeleteHoldingConfirm,
    isDeletingHolding
  );
  const navigation = useNavigation();

  const onDeletePress = (holding) => {
    setHoldingToDelete(holding);
    openDialog();
  };

  const sortTable = (sortByField) => {
    const sortInAscending = columnToSortBy === sortByField ? !sortAscending : true;
    const newSortedHoldings = [...sortedHoldings];
    if (sortInAscending) {
      newSortedHoldings.sort((a1, a2) =>
        typeof a1[sortByField] === typeof ""
          ? a1[sortByField].localeCompare(a2[sortByField])
          : a1[sortByField] - a2[sortByField]
      );
    } else {
      newSortedHoldings.sort((a1, a2) =>
        typeof a1[sortByField] === typeof ""
          ? a2[sortByField].localeCompare(a1[sortByField])
          : a2[sortByField] - a1[sortByField]
      );
    }
    setSortedHoldings(newSortedHoldings);
    setSortCriteria({
      columnToSortBy: sortByField,
      sortAscending: sortInAscending
    });
  };

  const toHoldingOverview = (coinId) => {
    console.log("here");
    navigation?.navigate("HoldingOverview", { coinId });
  };

  useEffect(() => {
    setSortedHoldings(holdings);
  }, [holdings]);

  const onVisibleColumnsSelect = (selectedOption) => {
    if (selectedOption === "holdings") {
      setShowPL(false);
      setSelectedColumn(0);
    } else if (selectedOption === "p/l") {
      setShowPL(true);
      setSelectedColumn(1);
    }
  };

  return (
    <View>
      <Text style={TYPOGRAPHY.headline}>Holdings</Text>
      <DropDown options={VISIBLE_COLUMNS} onSelect={onVisibleColumnsSelect} selectedIndex={selectedColumn} />
      <DataTable>
        <DataTable.Header style={STYLES.dataHeader}>
          {tableHeadings.map((th) => {
            if (showPL && th.label === "Holdings") {
              return null;
            } else if (!showPL && th.label === "P/L") {
              return null;
            }
            return (
              <PressableView key={th.label} onPress={() => sortTable(th.sortByField)} viewStyle={th.style}>
                <Text style={TYPOGRAPHY.body1}>{th.label}</Text>
                {columnToSortBy === th.sortByField && (
                  <AntDesign
                    name={sortAscending ? "caretup" : "caretdown"}
                    size={12}
                    style={STYLES.sortArrow}
                    color={colors.text}
                  />
                )}
              </PressableView>
            );
          })}
        </DataTable.Header>
        {sortedHoldings.map((holding, i) => (
          <Swipeable
            key={holding.coinId}
            renderRightActions={() => <SwipeableActions holding={holding} onDelete={onDeletePress} />}
            overshootRight={false}
          >
            <TouchableNativeFeedback onPress={() => toHoldingOverview(holding.coinId)}>
              <View>
                <DataTable.Row style={[STYLES.dataRow]}>
                  <View style={[STYLES.assetTableCell, STYLES.marginRight]}>
                    <IconImage
                      source={{
                        uri: holding.coinURL
                      }}
                    />
                    <View style={STYLES.assetNameAndTicker}>
                      <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
                        {holding.coinName}
                      </Text>
                      <Text numberOfLines={1} style={TYPOGRAPHY.caption}>
                        {holding.coinSymbol}
                      </Text>
                    </View>
                  </View>
                  <View style={[STYLES.flex, STYLES.marginRight]}>
                    <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                      ${formatNumWorklet(holding?.priceUSD?.value)}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        TYPOGRAPHY.textAlignRight,
                        getStylesBasedOnSign(holding?.priceUSD?.percentChange),
                        TYPOGRAPHY.caption
                      ]}
                    >
                      {formatPercentWorklet(holding?.priceUSD?.percentChange)}
                    </Text>
                  </View>
                  {showPL ? (
                    <View style={STYLES.flex}>
                      <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                        ${formatNumWorklet(holding?.profitLoss?.value)}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          TYPOGRAPHY.textAlignRight,
                          getStylesBasedOnSign(holding?.profitLoss?.percentChange),
                          TYPOGRAPHY.caption
                        ]}
                      >
                        {formatPercentWorklet(holding?.profitLoss?.percentChange)}
                      </Text>
                    </View>
                  ) : (
                    <View style={STYLES.flex}>
                      <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                        ${formatNumWorklet(holding.totalValue)}
                      </Text>
                      <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.caption]}>
                        {formatNumWorklet(holding.amount)}
                      </Text>
                    </View>
                  )}
                </DataTable.Row>
              </View>
            </TouchableNativeFeedback>
          </Swipeable>
        ))}
      </DataTable>
      <ConfirmationDialog />
    </View>
  );
};

const mapStateToProps = (state) => ({
  holdings: selectPortfolioHoldings(state),
  isLoading: selectIsLoadingPortfolioOverview(state),
  isDeletingHolding: selectIsDeletingHolding(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteHolding: (coinId, onSuccess) => dispatch(startDeletingHolding(coinId, onSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(HoldingsOverview);
