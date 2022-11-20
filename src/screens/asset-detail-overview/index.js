import React, { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LineChart, MultiColumnView, OutlinedText, Skeleton } from "../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { GLOBAL_CONSTANTS } from "../../constants";
import { connect } from "react-redux";
import {
  selectAssetOverview,
  selectIsLoadingAssetOverview,
  startAssetOverviewFetch,
  updateAssetOverview
} from "../../redux/asset-detail";
import { useLivePrices } from "../../hooks";
import { formatNumWorklet } from "../../utils";

const xValueAccessor = (dataInstance) => dataInstance.time;
const yValueAccessor = (dataInstance) => dataInstance.priceUsd;
const percentChangeAccessor = (data) => data.percentChange;
const dataPointsAccessor = (data) => data.prices;

const Statistic = ({ label, value }) => (
  <View key={label} style={STYLES.statistic}>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {label}
    </Text>
    <Text style={TYPOGRAPHY.body1} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const AssetDetailOverviewScreen = ({ asset, isLoading, fetchOverview, route, updateAsset }) => {
  const { params } = route;
  const { colors } = useTheme();

  const coinsToWatch = useMemo(() => (Object.keys(asset).length === 0 ? [] : [{ id: params.id }]), [asset]);
  const socket = useLivePrices(coinsToWatch);

  const onNewPrices = (newPrices = {}) => {
    if (newPrices[params.id] !== undefined) {
      // console.log(params.id, "updated");
      updateAsset({ priceUsd: `$${formatNumWorklet(newPrices[params.id])}` });
    }
  };

  useEffect(() => {
    fetchOverview(params.id);
  }, [params.id]);

  useEffect(() => {
    if (socket !== null) {
      console.log("asset detail - listener init");
      socket.on("new prices", onNewPrices);
    }

    return () => {
      if (socket !== null) {
        console.log("asset detail - listener removed");
        socket.off("new prices");
      }
    };
  }, [socket]);

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      <View style={STYLES.header}>
        {isLoading ? (
          <Skeleton style={STYLES.textSkeleton} />
        ) : (
          <View style={STYLES.nameRank}>
            <Text style={STYLES.fullName} numberOfLines={1}>
              {asset.name}
            </Text>
            <OutlinedText text={asset.rank} style={TYPOGRAPHY.caption} />
          </View>
        )}
        {isLoading ? (
          <Skeleton style={STYLES.textSkeleton} />
        ) : (
          <Text style={TYPOGRAPHY.display1} numberOfLines={1}>
            {asset.priceUsd}
          </Text>
        )}
      </View>
      <LineChart
        data={asset.priceHistory}
        chartStyle={STYLES.lineChart}
        xValueAccessor={xValueAccessor}
        yValueAccessor={yValueAccessor}
        percentChangeAccessor={percentChangeAccessor}
        dataPointsAccessor={dataPointsAccessor}
      />
      <View style={STYLES.statsContainer}>
        <Text style={STYLES.statsHeading}>Statistics</Text>
        {isLoading ? (
          <Skeleton style={STYLES.statsSkeleton} />
        ) : (
          <MultiColumnView
            sections={asset.statistics}
            renderItem={Statistic}
            SectionSeparator={() => <View style={[STYLES.statsSeparator, { borderColor: colors.text }]} />}
          />
        )}
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  statsHeading: {
    ...TYPOGRAPHY.headline,
    marginBottom: GLOBAL_CONSTANTS.MD_MARGIN
  },
  container: {
    ...GLOBAL_STYLES.screenContainer,
    paddingTop: 0
  },
  fullName: {
    ...TYPOGRAPHY.subheading,
    marginRight: GLOBAL_CONSTANTS.SM_MARGIN
  },
  nameRank: { flexDirection: "row", alignItems: "center" },
  statsContainer: {
    marginTop: GLOBAL_CONSTANTS.LG_MARGIN
  },
  statsSeparator: { borderWidth: 1, marginRight: GLOBAL_CONSTANTS.MD_MARGIN },
  statistic: {
    marginBottom: GLOBAL_CONSTANTS.SM_MARGIN
  },
  lineChart: {
    width: "100%",
    height: 180
  },
  textSkeleton: { width: "100%", height: 30, marginBottom: GLOBAL_CONSTANTS.LG_MARGIN },
  statsSkeleton: { width: "100%", height: 250 }
});

const mapStateToProps = (state) => ({
  asset: selectAssetOverview(state),
  isLoading: selectIsLoadingAssetOverview(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (id) => dispatch(startAssetOverviewFetch(id)),
  updateAsset: (assetUpdates) => dispatch(updateAssetOverview(assetUpdates))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailOverviewScreen);
