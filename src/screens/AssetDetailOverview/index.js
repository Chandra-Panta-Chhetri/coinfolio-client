import React, { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LineChart, MultiColumnView, OutlinedText, Skeleton } from "../../components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { GLOBAL_CONSTANTS } from "../../constants";
import { connect } from "react-redux";
import {
  selectAssetOverview,
  selectIsLoadingAssetOverview,
  fetchAssetOverview,
  updateAssetOverview
} from "../../redux/asset-detail";
import { useLivePrices } from "../../hooks";
import { formatPrice, isNullOrUndefined } from "../../utils";
import { Statistic } from "./components";

const xValueAccessor = (dataInstance) => dataInstance?.time;
const yValueAccessor = (dataInstance) => dataInstance?.priceUsd;
const percentChangeAccessor = (data) => data?.percentChange;
const dataPointsAccessor = (data) => data?.prices;

const AssetDetailOverviewScreen = ({
  assetOverview,
  isLoadingAssetOverview,
  fetchAssetOverview,
  route,
  updateAssetOverview
}) => {
  const { params } = route;
  const { colors } = useTheme();

  const coinsToWatch = useMemo(
    () => (Object.keys(assetOverview ?? [])?.length === 0 ? [] : [{ id: params?.id }]),
    [assetOverview]
  );
  const socket = useLivePrices(coinsToWatch);

  const onNewPrices = (newPrices = {}) => {
    if (!isNullOrUndefined(newPrices[params?.id])) {
      // console.log(params.id, "updated");
      updateAssetOverview({ priceUsd: `${newPrices[params?.id]}` });
    }
  };

  useEffect(() => {
    fetchAssetOverview(params?.id);
  }, [params.id]);

  useEffect(() => {
    if (!isNullOrUndefined(socket)) {
      socket.on(SOCKET_EVENT_NAMES.NEW_PRICES, onNewPrices);
    }

    return () => {
      if (!isNullOrUndefined(socket)) {
        socket.off(SOCKET_EVENT_NAMES.NEW_PRICES);
      }
    };
  }, [socket]);

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      <View style={STYLES.header}>
        {isLoadingAssetOverview ? (
          <Skeleton style={STYLES.textSkeleton} />
        ) : (
          <View style={STYLES.nameRank}>
            <Text style={STYLES.fullName} numberOfLines={1}>
              {assetOverview?.name}
            </Text>
            <OutlinedText text={assetOverview?.rank} style={TYPOGRAPHY.caption} />
          </View>
        )}
        {isLoadingAssetOverview ? (
          <Skeleton style={STYLES.textSkeleton} />
        ) : (
          <Text style={TYPOGRAPHY.display1} numberOfLines={1}>
            {formatPrice(assetOverview?.priceUsd)}
          </Text>
        )}
      </View>
      <LineChart
        data={assetOverview?.priceHistory}
        chartStyle={STYLES.lineChart}
        xValueAccessor={xValueAccessor}
        yValueAccessor={yValueAccessor}
        percentChangeAccessor={percentChangeAccessor}
        dataPointsAccessor={dataPointsAccessor}
      />
      <View style={STYLES.statsContainer}>
        <Text style={STYLES.statsHeading}>Statistics</Text>
        {isLoadingAssetOverview ? (
          <Skeleton style={STYLES.statsSkeleton} />
        ) : (
          <MultiColumnView
            sections={assetOverview?.statistics}
            renderItem={Statistic}
            SectionSeparator={() => <View style={[STYLES.statsSeparator, { borderColor: colors?.text }]} />}
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
  lineChart: {
    width: "100%",
    height: 180
  },
  textSkeleton: { width: "100%", height: 30, marginBottom: GLOBAL_CONSTANTS.LG_MARGIN },
  statsSkeleton: { width: "100%", height: 250 }
});

const mapStateToProps = (state) => ({
  assetOverview: selectAssetOverview(state),
  isLoadingAssetOverview: selectIsLoadingAssetOverview(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchAssetOverview: (id) => dispatch(fetchAssetOverview(id)),
  updateAssetOverview: (assetUpdates) => dispatch(updateAssetOverview(assetUpdates))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailOverviewScreen);
