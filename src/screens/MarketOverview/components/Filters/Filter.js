import React from "react";
import { Badge, TouchableOption } from "../../../../components";
import { useBottomSheet } from "../../../../hooks";
import { isNullOrUndefined } from "../../../../utils";

const Filter = ({ options, customStyles, onSelect, selectedOption, label, name }) => {
  const { openBottomSheet, BottomSheet, closeBottomSheet } = useBottomSheet({ name });

  return (
    <>
      <Badge label={label} onPress={openBottomSheet} containerStyle={customStyles} />
      <BottomSheet>
        {(options ?? []).map((f) => (
          <TouchableOption
            label={f?.label}
            onSelect={() => {
              if (f.value !== selectedOption?.value && !isNullOrUndefined(onSelect)) {
                onSelect(f);
              }
              closeBottomSheet();
            }}
            isSelected={selectedOption?.value === f?.value}
            key={f?.value}
          />
        ))}
      </BottomSheet>
    </>
  );
};

export default Filter;
