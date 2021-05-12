import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { selectNotifications } from "../redux/notification/notification.selectors";
import { createStructuredSelector } from "reselect";
import { addSuccessNotification } from "../redux/notification/notification.actions";
import {
  Card,
  Paragraph,
  IconButton,
  Caption,
  TouchableRipple
} from "react-native-paper";

function HomeScreen({ navigation }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>Market Cap: </Paragraph>
              $3,026,234,553,628
            </Paragraph>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>24h Vol: </Paragraph>
              $286,423,453,955
            </Paragraph>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>BTC Dominance: </Paragraph>
              42.4%
            </Paragraph>
            <Paragraph style={styles.rightMargin}>
              <Paragraph style={styles.bold}>ETH Dominance: </Paragraph>
              19.4%
            </Paragraph>
          </ScrollView>
        </Card.Content>
      </Card>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shortcutIconContainer}
      >
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="bell-alert" color="blue" />
            </View>
            <Caption style={styles.iconButtonLabel}>Price Alerts</Caption>
          </View>
        </TouchableRipple>
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="compare" color="blue" />
            </View>
            <Caption style={styles.iconButtonLabel}>Compare</Caption>
          </View>
        </TouchableRipple>
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="calculator" color="blue" />
            </View>
            <Caption style={styles.iconButtonLabel}>Converter</Caption>
          </View>
        </TouchableRipple>
        <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => {}}>
          <View style={styles.shortcutIconItem}>
            <View style={styles.iconButton}>
              <IconButton icon="eye" color="blue" />
            </View>
            <Caption style={styles.iconButtonLabel}>Watchlist</Caption>
          </View>
        </TouchableRipple>
      </ScrollView>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  rightMargin: {
    marginRight: 10
  },
  bold: {
    fontWeight: "bold"
  },
  shortcutIconContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginTop: 10
  },
  shortcutIconItem: {
    alignItems: "center",
    padding: 5
  },
  iconButton: {
    borderWidth: 5,
    borderRadius: 30,
    borderColor: "white",
    backgroundColor: "#ECECEC"
  },
  iconButtonLabel: {
    color: "black",
    fontWeight: "bold"
  }
});

const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications
});

const mapDispatchToProps = (dispatch) => ({
  test: () => dispatch(addSuccessNotification("Test"))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
