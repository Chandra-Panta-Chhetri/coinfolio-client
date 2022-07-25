import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LineChart, MultiColumnView, OutlinedText, Skeleton } from "../../shared-components";
import { GLOBAL_STYLES, TYPOGRAPHY } from "../../styles";
import { GLOBAL_CONSTANTS } from "../../constants";
import { connect } from "react-redux";
import { selectAssetOverview, selectIsLoadingAssetOverview, startAssetOverviewFetch } from "../../redux/asset-detail";

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

const AssetDetailOverviewScreen = ({ overview, isLoading, fetchOverview, route }) => {
  const { colors } = useTheme();
  const { params } = route;

  useEffect(() => {
    fetchOverview(params.id);
  }, []);

  return (
    <ScrollView contentContainerStyle={STYLES.container}>
      <View style={STYLES.header}>
        {isLoading ? (
          <Skeleton style={STYLES.textSkeleton} />
        ) : (
          <View style={STYLES.nameRank}>
            <Text style={STYLES.fullName} numberOfLines={1}>
              {overview.name}
            </Text>
            <OutlinedText text={overview.rank} style={TYPOGRAPHY.caption} />
          </View>
        )}
        {isLoading ? (
          <Skeleton style={STYLES.textSkeleton} />
        ) : (
          <Text style={TYPOGRAPHY.display1} numberOfLines={1}>
            {overview.priceUsd}
          </Text>
        )}
      </View>
      <LineChart
        data={overview.priceHistory}
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
            sections={overview.statistics}
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
  overview: selectAssetOverview(state),
  isLoading: selectIsLoadingAssetOverview(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchOverview: (id) => dispatch(startAssetOverviewFetch(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailOverviewScreen);
