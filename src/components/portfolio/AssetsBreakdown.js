import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Paragraph, Avatar, Headline } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsLoadingPortfolio,
  selectPortfolioAssets
} from "../../redux/portfolio/portfolio.selectors";
import { AntDesign } from "@expo/vector-icons";
import PressableView from "../shared/PressableView";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";
import { appendPlusOrMinus, getStylesBasedOnPosOrNeg } from "../../GlobalUtils";

const styles = StyleSheet.create({
  heading: { fontWeight: "bold", marginTop: 15 },
  dataHeader: { borderBottomWidth: 0 },
  dataTitle: {
    fontWeight: "bold"
  },
  dataRow: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomColor: "black"
  },
  flexRow: {
    flexDirection: "row"
  },
  rightAlign: {
    textAlign: "right"
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
    style: styles.assetTableHeading,
    sortByField: "fullName"
  },
  {
    label: "Price",
    style: styles.rightAlignedTableHeading,
    sortByField: "currentPrice"
  },
  {
    label: "Holdings",
    style: styles.rightAlignedTableHeading,
    sortByField: "holdingsVal"
  }
];

const AssetsBreakdown = ({ assets = [], isLoading }) => {
  const [sortCriteria, setSortCriteria] = useState({
    columnToSortBy: "fullName",
    sortAscending: true
  });
  const [sortedAssets, setSortedAssets] = useState(assets);
  const { columnToSortBy, sortAscending } = sortCriteria;

  const sortTable = (sortByField) => {
    const sortInAscending =
      columnToSortBy === sortByField ? !sortAscending : true;
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
    <>
      <Headline style={styles.heading}>Assets</Headline>
      <DataTable style={GlobalStyles.portfolioElementMargin}>
        <DataTable.Header style={styles.dataHeader}>
          {tableHeadings.map((th) => (
            <PressableView
              key={th.label}
              onPress={() => sortTable(th.sortByField)}
              viewStyle={th.style}
            >
              <Paragraph style={styles.dataTitle}>{th.label}</Paragraph>
              {columnToSortBy === th.sortByField && (
                <AntDesign
                  name={sortAscending ? "caretup" : "caretdown"}
                  size={CONSTANTS.ASSETS_BREAKDOWN.SORT_ICON_SIZE}
                  style={styles.sortArrow}
                  color="black"
                />
              )}
            </PressableView>
          ))}
        </DataTable.Header>
        {sortedAssets.map((asset, i) => (
          <DataTable.Row
            key={asset.ticker}
            style={[
              styles.dataRow,
              {
                borderBottomWidth: i + 1 === assets.length ? 1 : 0
              }
            ]}
          >
            <View style={[styles.assetTableCell, styles.marginRight]}>
              <Avatar.Image
                size={CONSTANTS.SHARED.AVATAR_IMAGE_SIZE}
                source={{
                  uri: asset.iconSrc
                }}
              />
              <View style={styles.assetNameAndTicker}>
                <Paragraph numberOfLines={1}>{asset.fullName}</Paragraph>
                <Paragraph numberOfLines={1}>{asset.ticker}</Paragraph>
              </View>
            </View>
            <View style={[styles.flex, styles.marginRight]}>
              <Paragraph numberOfLines={1} style={styles.rightAlign}>
                ${asset.currentPrice}
              </Paragraph>
              <Paragraph
                numberOfLines={1}
                style={[
                  styles.rightAlign,
                  getStylesBasedOnPosOrNeg(asset.pricePercentChange)
                ]}
              >
                {appendPlusOrMinus(asset.pricePercentChange)}%
              </Paragraph>
            </View>
            <View style={styles.flex}>
              <Paragraph numberOfLines={1} style={styles.rightAlign}>
                ${asset.holdingsVal}
              </Paragraph>
              <Paragraph numberOfLines={1} style={styles.rightAlign}>
                {asset.totalHoldings}
              </Paragraph>
            </View>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  );
};

const mapStateToProps = (state) => ({
  assets: selectPortfolioAssets(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(AssetsBreakdown);
