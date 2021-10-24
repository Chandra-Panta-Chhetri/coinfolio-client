import React from "react";
import { StyleSheet, View, Text } from "react-native";

function EventDetailScreen({ route }) {
  return (
    <View style={STYLES.container}>
      <Text style={STYLES.text}>
        Event Detail Screen - {route.params.eventName}
      </Text>
    </View>
  );
}

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default EventDetailScreen;
