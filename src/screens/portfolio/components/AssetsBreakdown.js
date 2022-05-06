import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { selectIsLoadingPortfolio, selectPortfolioAssets } from "../../../redux/portfolio";
import { AntDesign } from "@expo/vector-icons";
import { PressableView, IconImage } from "../../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../../styles";
import { formatNumBasedOnSignWorklet, getStylesBasedOnSign } from "../../../utils";

const STYLES = StyleSheet.create({
  dataHeader: { borderBottomWidth: 0 },
  dataRow: {
    paddingVertical: 8,
    borderTopColor: "black",
    borderBottomColor: "black",
    ...GLOBAL_STYLES.tableTopBorderWidth
  },
  flex: {
    flex: 1
  },
  marginRight: {
    marginRight: 8
  },
  assetTableCell: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1.3
  },
  assetNameAndTicker: { marginLeft: 7, flex: 1 },
  assetTableHeading: {
    flexGrow: 1.8,
    flexDirection: "row",
    alignItems: "center"
  },
  rightAlignedTableHeading: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 0.8,
    flexDirection: "row"
  },
  sortArrow: {
    marginLeft: 6
  }
});

const tableHeadings = [
  {
    label: "Asset",
    style: STYLES.assetTableHeading,
    sortByField: "fullName"
  },
  {
    label: "Price",
    style: STYLES.rightAlignedTableHeading,
    sortByField: "currentPrice"
  },
  {
    label: "Holdings",
    style: STYLES.rightAlignedTableHeading,
    sortByField: "holdingsVal"
  }
];

const AssetsBreakdown = ({ assets = [], isLoading }) => {
  const { colors } = useTheme();
  const [sortCriteria, setSortCriteria] = useState({
    columnToSortBy: "fullName",
    sortAscending: true
  });
  const [sortedAssets, setSortedAssets] = useState(assets);
  const { columnToSortBy, sortAscending } = sortCriteria;

  const sortTable = (sortByField) => {
    const sortInAscending = columnToSortBy === sortByField ? !sortAscending : true;
    const newSortedAssets = sortedAssets;
    if (sortInAscending) {
      newSortedAssets.sort((a1, a2) =>
        typeof a1[sortByField] === typeof ""
          ? a1[sortByField].localeCompare(a2[sortByField])
          : a1[sortByField] - a2[sortByField]
      );
    } else {
      newSortedAssets.sort((a1, a2) =>
        typeof a1[sortByField] === typeof ""
          ? a2[sortByField].localeCompare(a1[sortByField])
          : a2[sortByField] - a1[sortByField]
      );
    }
    setSortedAssets(newSortedAssets);
    setSortCriteria({
      columnToSortBy: sortByField,
      sortAscending: sortInAscending
    });
  };

  return (
    <View>
      <Text style={TYPOGRAPHY.headline}>Assets</Text>
      <DataTable>
        <DataTable.Header style={STYLES.dataHeader}>
          {tableHeadings.map((th) => (
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
          ))}
        </DataTable.Header>
        {sortedAssets.map((asset, i) => (
          <DataTable.Row
            key={asset.ticker}
            style={[
              STYLES.dataRow,
              i + 1 === assets.length ? GLOBAL_STYLES.tableBottomBorderWidth : { borderBottomWidth: 0 }
            ]}
          >
            <View style={[STYLES.assetTableCell, STYLES.marginRight]}>
              <IconImage
                source={{
                  uri: asset.iconSrc
                }}
              />
              <View style={STYLES.assetNameAndTicker}>
                <Text numberOfLines={1} style={TYPOGRAPHY.body1}>
                  {asset.fullName}
                </Text>
                <Text numberOfLines={1} style={TYPOGRAPHY.caption}>
                  {asset.ticker}
                </Text>
              </View>
            </View>
            <View style={[STYLES.flex, STYLES.marginRight]}>
              <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                ${asset.currentPrice}
              </Text>
              <Text
                numberOfLines={1}
                style={[TYPOGRAPHY.textAlignRight, getStylesBasedOnSign(asset.pricePercentChange), TYPOGRAPHY.caption]}
              >
                {formatNumBasedOnSignWorklet(asset.pricePercentChange)}%
              </Text>
            </View>
            <View style={STYLES.flex}>
              <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.body1]}>
                ${asset.holdingsVal}
              </Text>
              <Text numberOfLines={1} style={[TYPOGRAPHY.textAlignRight, TYPOGRAPHY.caption]}>
                {asset.totalHoldings}
              </Text>
            </View>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const mapStateToProps = (state) => ({
  assets: selectPortfolioAssets(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(AssetsBreakdown);
