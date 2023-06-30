import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { selectNotifications, clearRecentNotification } from "../redux/notification";
import { connect } from "react-redux";
import { TYPOGRAPHY } from "../styles";
import { isNullOrUndefined } from "../utils";
import { COLORS } from "../constants";

const DURATION_IN_MS = 2500;

const NotificationSnackbar = ({ notifications, clearRecentNotification }) => {
  const [prevBackgroundColor, setPrevBackgroundColor] = useState(COLORS.TRANSPARENT);
  const displayedNotification = notifications[0] ?? null;
  const hasNotificationsLeft = notifications?.length > 0 ?? false;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isNullOrUndefined(displayedNotification)) {
      setPrevBackgroundColor(displayedNotification?.backgroundColor);
    }
  }, [displayedNotification]);

  useEffect(() => {
    if (hasNotificationsLeft) {
      timerRef.current = setInterval(() => {
        clearRecentNotification();
      }, DURATION_IN_MS);
    }

    return () => {
      if (!isNullOrUndefined(timerRef?.current)) {
        clearInterval(timerRef?.current);
      }
    };
  }, [notifications]);

  return (
    <Snackbar
      visible={hasNotificationsLeft}
      onDismiss={clearRecentNotification}
      duration={Infinity}
      action={{
        label: "X",
        onPress: clearRecentNotification,
        labelStyle: STYLES.notificationMsg
      }}
      style={[STYLES.container, { backgroundColor: prevBackgroundColor }]}
    >
      <Text style={STYLES.notificationMsg}>{displayedNotification?.message}</Text>
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
  notifications: selectNotifications(state)
});

const mapDispatchToProps = (dispatch) => ({
  clearRecentNotification: () => dispatch(clearRecentNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSnackbar);
