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
import SOCKET_EVENT_NAMES from "../../socket/event-names";

const valueAccessors = {
  xValueAccessor: (dataInstance) => dataInstance?.time,
  yValueAccessor: (dataInstance) => dataInstance?.priceUsd,
  percentChangeAccessor: (data) => data?.history?.percentChange,
  dataPointsAccessor: (data) => data?.history?.prices
};

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
            <OutlinedText text={assetOverview?.rank} style={TYPOGRAPHY.caption} />
            <Text style={STYLES.fullName} numberOfLines={1}>
              {assetOverview?.name}
            </Text>
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
      <LineChart dataPoints={assetOverview?.priceHistory} style={STYLES.lineChart} valueAccessors={valueAccessors} />
      <View style={STYLES.statsContainer}>
        <Text style={STYLES.statsHeading}>Statistics</Text>
        {isLoadingAssetOverview ? (
          <Skeleton style={STYLES.statsSkeleton} />
        ) : (
          <MultiColumnView sections={assetOverview?.statistics} renderItem={Statistic} />
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
    marginLeft: GLOBAL_CONSTANTS.SM_MARGIN
  },
  nameRank: { flexDirection: "row", alignItems: "center" },
  statsContainer: {
    marginTop: GLOBAL_CONSTANTS.LG_MARGIN
  },
  statsSeparator: {},
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
