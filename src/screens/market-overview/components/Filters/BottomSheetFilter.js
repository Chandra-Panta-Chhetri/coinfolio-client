import React from "react";
import { Badge, TouchableOption } from "../../../../shared-components";
import { useBottomSheet } from "../../../../hooks";

const BottomSheetFilter = ({
  filters = [],
  filterStyles = {},
  onFilterSelect,
  activeFilter = {},
  filterLabel,
  bottomSheetKey
}) => {
  const { openBottomSheet, BottomSheet, closeBottomSheet } = useBottomSheet({ name: bottomSheetKey });

  return (
    <>
      <Badge label={filterLabel} onPress={openBottomSheet} containerStyle={filterStyles} />
      <BottomSheet>
        {filters.map((f) => (
          <TouchableOption
            label={f.label}
            onSelect={() => {
              f.value !== activeFilter.value && onFilterSelect && onFilterSelect(f);
              closeBottomSheet();
            }}
            isSelected={activeFilter.value === f.value}
            key={f.value}
          />
        ))}
      </BottomSheet>
    </>
  );
};

export default BottomSheetFilter;
