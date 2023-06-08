const PIE_CHART_DEFAULTS = {
  INNER_LABEL_CONFIG: {
    textAnchor: "middle",
    dy: "0.50em"
  },
  MAX_RADIUS_OFFSET: 2,
  SELECTED_ELEVATION: 5,
  END_ANGLE: Math.PI * 2,
  INNER_RADIUS: 0,
  OUTER_RADIUS: 0,
  START_ANGLE: 0,
  PAD_ANGLE: 0,
  SORT: (a, b) => b?.value - a?.value,
  VALUE_ACCESSOR: ({ item }) => item?.value,
  INNER_LABEL_VALUE_ACCESSOR: (selectedSlice) => `${selectedSlice?.key} - ${selectedSlice?.value}%`,
  DATA_POINTS: []
};

export default PIE_CHART_DEFAULTS;
