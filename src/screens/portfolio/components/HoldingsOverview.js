import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectIsLoadingPortfolio, selectPortfolioHoldings } from "../../../redux/portfolio";
import { AntDesign } from "@expo/vector-icons";
import { PressableView, IconImage, DropDown } from "../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { formatNumWorklet, formatPercentWorklet, getStylesBasedOnSign } from "../../../utils";
import { GLOBAL_CONSTANTS } from "../../../constants";

const STYLES = StyleSheet.create({
  dataHeader: { borderBottomWidth: 0 },
  dataRow: {
    paddingVertical: 8,
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopWidth: GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
  },
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

const HoldingsOverview = ({ holdings, isLoading }) => {
  const { colors } = useTheme();
  const [sortCriteria, setSortCriteria] = useState({
    columnToSortBy: "totalValue",
    sortAscending: false
  });
  const [sortedHoldings, setSortedHoldings] = useState([]);
  const [showPL, setShowPL] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(0);
  const { columnToSortBy, sortAscending } = sortCriteria;

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
          <DataTable.Row key={holding.coinId} style={[STYLES.dataRow]}>
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
        ))}
      </DataTable>
    </View>
  );
};

const mapStateToProps = (state) => ({
  holdings: selectPortfolioHoldings(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(HoldingsOverview);
