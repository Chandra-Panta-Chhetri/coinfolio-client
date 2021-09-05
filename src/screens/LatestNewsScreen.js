import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import CONSTANTS from "../Constants";

const LatestNewsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchNewsWithFilter = (selectedFilter) => {};

  return (
    <View style={[GlobalStyles.screenContainer, { paddingTop: 0 }]}>
      {/* <Picker
        selectedValue={selectedFilter}
        onValueChange={fetchNewsWithFilter}
      >
        {<Picker.Item />}
      </Picker> */}
      <Text style={styles.text}>Latest News Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default LatestNewsScreen;
