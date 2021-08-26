import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Paragraph } from "react-native-paper";
import { selectRecentNotification } from "../../redux/notification/notification.selectors";
import { clearNotifications } from "../../redux/notification/notification.actions";
import { connect } from "react-redux";
import CONSTANTS from "../../Constants";
import GlobalStyles from "../../GlobalStyles";

const NotificationSnackbar = ({ notification, clearNotifications }) => {
  const backgroundColor = notification ? notification.backgroundColor : "black";

  return (
    <Snackbar
      visible={notification}
      onDismiss={clearNotifications}
      duration={CONSTANTS.SNACKBAR.DURATION}
      action={{
        label: "X",
        onPress: clearNotifications,
        labelStyle: styles.notificationMsg
      }}
      style={[styles.snackbar, { backgroundColor }]}
    >
      <Paragraph style={[GlobalStyles.body2, styles.notificationMsg]}>
        {notification && notification.message}
      </Paragraph>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    bottom: 52
  },
  notificationMsg: {
    color: "white"
  }
});

const mapStateToProps = (state) => ({
  notification: selectRecentNotification(state)
});

const mapDispatchToProps = (dispatch) => ({
  clearNotifications: () => dispatch(clearNotifications())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSnackbar);
