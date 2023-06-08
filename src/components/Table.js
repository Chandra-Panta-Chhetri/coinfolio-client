import React, { useState } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { GLOBAL_CONSTANTS } from "../constants";

const CELL_SIZE_MULTIPLIER = 0.3;

const Heading = ({ cellStyle, label }) => (
  <Text style={cellStyle} key={th}>
    {label}
  </Text>
);

const Table = ({ headings, containerStyle, renderRow, data }) => {
  const { colors } = useTheme();
  const [widthOfCell, setWidthOfCell] = useState(0);

  const onLayout = (event) => {
    if (widthOfCell === 0) {
      setWidthOfCell(event.nativeEvent.layout.width * CELL_SIZE_MULTIPLIER);
    }
  };

  const cellStyle = {
    width: widthOfCell,
    borderColor: colors.border,
    ...STYLES.cell
  };

  return (
    <ScrollView horizontal contentContainerStyle={containerStyle} onLayout={onLayout}>
      <View>
        <View style={[STYLES.row]}>
          {(headings ?? []).map((heading) => (
            <Heading label={heading} key={heading} />
          ))}
        </View>
        <FlatList
          data={data ?? []}
          horizontal={false}
          renderItem={(props) => (
            <View style={STYLES.row} key={props.index}>
              {renderRow(props, cellStyle)}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const STYLES = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  cell: {
    flexGrow: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: GLOBAL_CONSTANTS.TABLE_BORDER_WIDTH
  }
});

export default Table;
