import React from "react";
import { FilterBadge, TouchableSelectOption } from "../../../../shared-components";
import { useBottomSheet } from "../../../../hooks";
import { GLOBAL_CONSTANTS } from "../../../../constants";

const BottomSheetFilter = ({
  filters = [],
  filterStyles = {},
  onFilterSelect = GLOBAL_CONSTANTS.EMPTY_FUNCTION,
  activeFilter = {},
  filterLabel = "",
  bottomSheetKey = ""
}) => {
  const { openBottomSheet, BottomSheet, closeBottomSheet } = useBottomSheet({ name: bottomSheetKey });

  return (
    <>
      <FilterBadge label={filterLabel} onPress={openBottomSheet} containerStyle={filterStyles} />
      <BottomSheet>
        {filters.map((f) => (
          <TouchableSelectOption
            label={f.label}
            onSelect={() => {
              onFilterSelect(f);
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
