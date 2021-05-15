import React from "react";
import GlobalMarketSummary from "../components/GlobalMarketSummary";
import ShortcutIcons from "../components/ShortcutIcons";
import TopCoins from "../components/TopCoins";
import GainersLosers from "../components/GainersLosers";
import NewsSummary from "../components/NewsSummary";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { connect } from "react-redux";
import { selectNotifications } from "../redux/notification/notification.selectors";
import { createStructuredSelector } from "reselect";
import { addSuccessNotification } from "../redux/notification/notification.actions";

function HomeScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <GlobalMarketSummary />
          <ShortcutIcons />
          <TopCoins />
          <GainersLosers />
          <NewsSummary />
        </>
      }
      listKey="HomeScreenList"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(addSuccessNotification("Test"))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
