import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import CONSTANTS from "../Constants";

const LatestNewsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchNewsWithFilter = (selectedFilter) => {
    //call redux function
    setSelectedFilter(selectedFilter);
  };

  return (
    <View style={[GlobalStyles.screenContainer, styles.container]}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={fetchNewsWithFilter}
      >
        {CONSTANTS.LATEST_NEWS.FILTERS.map((filter) => (
          <Picker.Item {...filter} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  }
});

export default LatestNewsScreen;
