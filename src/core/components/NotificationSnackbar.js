import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { selectRecentNotification, clearNotifications } from "../../redux/notification";
import { connect } from "react-redux";
import { TYPOGRAPHY } from "../../styles";

const NotificationSnackbar = ({ notification, clearNotifications }) => {
  const [prevBackgroundColor, setPrevBackgroundColor] = useState(null);

  useEffect(() => {
    if (notification !== null) {
      setPrevBackgroundColor(notification.backgroundColor);
    }
  }, [notification]);

  return (
    <Snackbar
      visible={notification}
      onDismiss={clearNotifications}
      duration={2300}
      action={{
        label: "X",
        onPress: clearNotifications,
        labelStyle: STYLES.notificationMsg
      }}
      style={[STYLES.snackbar, { backgroundColor: prevBackgroundColor }]}
    >
      <Text style={STYLES.notificationMsg}>{notification && notification.message}</Text>
    </Snackbar>
  );
};

const STYLES = StyleSheet.create({
  snackbar: {
    bottom: 52
  },
  notificationMsg: {
    color: "white",
    ...TYPOGRAPHY.body2
  }
});

const mapStateToProps = (state) => ({
  notification: selectRecentNotification(state)
});

const mapDispatchToProps = (dispatch) => ({
  clearNotifications: () => dispatch(clearNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSnackbar);
