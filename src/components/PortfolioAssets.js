import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, Paragraph, Avatar, Headline } from "react-native-paper";
import { connect } from "react-redux";
import {
  selectIsLoadingPortfolio,
  selectPortfolioAssets
} from "../redux/portfolio/portfolio.selectors";

const PortfolioAssets = ({ assets = [], isLoading }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Headline style={styles.heading}>Assets</Headline>
      <DataTable style={styles.dataTable}>
        <DataTable.Header style={styles.dataHeader}>
          <DataTable.Title>
            <Paragraph style={styles.dataTitle}>Asset</Paragraph>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Paragraph style={styles.dataTitle}>Price</Paragraph>
          </DataTable.Title>
          <DataTable.Title numeric>
            <Paragraph style={styles.dataTitle}>Holdings</Paragraph>
          </DataTable.Title>
        </DataTable.Header>
        {assets.map(({ asset, price, holdings }, i) => (
          <DataTable.Row
            key={asset.ticker}
            style={[
              styles.dataRow,
              {
                borderBottomWidth: i + 1 === assets.length ? 1 : 0
              }
            ]}
          >
            <View style={styles.assetTableCell}>
              <Avatar.Image
                size={35}
                source={{
                  uri: asset.iconSrc
                }}
              />
              <View style={styles.assetNameAndTicker}>
                <Paragraph numberOfLines={1}>{asset.fullName}</Paragraph>
                <Paragraph numberOfLines={1}>{asset.ticker}</Paragraph>
              </View>
            </View>
            <View style={styles.flex}>
              <Paragraph numberOfLines={1} style={styles.rightAlign}>
                ${price.current}
              </Paragraph>
              <Paragraph
                numberOfLines={1}
                style={[
                  styles.rightAlign,
                  { color: price.percentChange >= 0 ? "green" : "red" }
                ]}
              >
                {price.percentChange >= 0 ? "+" : ""}
                {price.percentChange}%
              </Paragraph>
            </View>
            <View style={styles.flex}>
              <Paragraph numberOfLines={1} style={styles.rightAlign}>
                ${holdings.currentVal}
              </Paragraph>
              <Paragraph numberOfLines={1} style={styles.rightAlign}>
                {holdings.totalCoins}
              </Paragraph>
            </View>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  );
};

const styles = StyleSheet.create({
  heading: { fontWeight: "bold", marginTop: 15 },
  dataTable: { marginBottom: 15 },
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
  assetTableCell: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  assetNameAndTicker: { marginLeft: 7 }
});

const mapStateToProps = (state) => ({
  assets: selectPortfolioAssets(state),
  isLoading: selectIsLoadingPortfolio(state)
});

export default connect(mapStateToProps)(PortfolioAssets);
