export default {
  INNER_LABEL_CONFIG: {
    textAnchor: "middle",
    dy: "0.50em"
  },
  MAX_RADIUS_OFFSET: 2,
  SELECTED_ELEVATION: 5,
  DEFAULT_END_ANGLE: Math.PI * 2,
  DEFAULT_START_ANGLE: 0,
  DEFAULT_PAD_ANGLE: 0,
  DEFAULT_SORT_FUNCTION: (a, b) => b.value - a.value,
  DEFAULT_VALUE_ACCESSOR_FUNCTION: ({ item }) => item.value,
  DEFAULT_INNER_LABEL_VALUE_ACCESSOR_FUNCTION: (selectedSlice) =>
    `${selectedSlice.key} - ${selectedSlice.value}%`
};
