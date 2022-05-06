import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { selectRecentNotification, clearRecentNotification } from "../../redux/notification";
import { connect } from "react-redux";
import { TYPOGRAPHY } from "../../styles";

const NotificationSnackbar = ({ notification, clearRecentNotification }) => {
  const [prevBackgroundColor, setPrevBackgroundColor] = useState(null);

  useEffect(() => {
    if (notification !== null) {
      setPrevBackgroundColor(notification.backgroundColor);
    }
  }, [notification]);

  return (
    <Snackbar
      visible={notification}
      onDismiss={clearRecentNotification}
      duration={2500}
      action={{
        label: "X",
        onPress: clearRecentNotification,
        labelStyle: STYLES.notificationMsg
      }}
      style={[STYLES.container, { backgroundColor: prevBackgroundColor }]}
    >
      <Text style={STYLES.notificationMsg}>{notification?.message}</Text>
    </Snackbar>
  );
};

const STYLES = StyleSheet.create({
  container: {
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
  clearRecentNotification: () => dispatch(clearRecentNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSnackbar);
