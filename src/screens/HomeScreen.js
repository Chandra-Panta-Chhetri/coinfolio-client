import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { selectNotifications } from "../redux/notification/notification.selectors";
import { createStructuredSelector } from "reselect";
import { addSuccessNotification } from "../redux/notification/notification.actions";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

function HomeScreen({ navigation, notifications, test }) {
  useEffect(() => {
    test();
  }, []);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  rightMargin: {
    marginRight: 10
  },
  bold: {
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
