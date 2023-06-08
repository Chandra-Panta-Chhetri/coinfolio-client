import React, { useState } from "react";
import { DropDown } from "../../../../components";
import { isNullOrUndefined } from "../../../../utils";

export const HOLDINGS_COLUMN = {
  label: "Holdings",
  value: "holdings"
};
export const PL_COLUMN = {
  label: "P/L",
  value: "p/l"
};

export const SELECT_VISIBLE_COLUMNS = [HOLDINGS_COLUMN, PL_COLUMN];

const SelectVisibleColumn = ({ onSelect }) => {
  const [selectedColumn, setSelectedColumn] = useState(0);

  const onColumnSelect = (selectedColumn, selectedIndex) => {
    if (!isNullOrUndefined(onSelect)) {
      onSelect(selectedColumn);
    }
    setSelectedColumn(selectedIndex);
  };

  return <DropDown options={SELECT_VISIBLE_COLUMNS} onSelect={onColumnSelect} selectedIndex={selectedColumn} />;
};

export default SelectVisibleColumn;
