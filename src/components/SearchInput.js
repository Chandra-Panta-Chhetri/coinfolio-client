import { debounce } from "lodash";
import React, { useState, useCallback } from "react";
import TextInput from "./TextInput";
import { isNullOrUndefined } from "../utils";

const DEBOUNCE_TIME_IN_MS = 500;

const SearchInput = ({ onChange, debounceTime = DEBOUNCE_TIME_IN_MS, ...inputProps }) => {
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (!isNullOrUndefined(onChange)) {
        onChange(searchTerm);
      }
    }, debounceTime),
    [onChange, debounceTime]
  );

  const onKeywordChange = (text) => {
    setKeyword(text);
    debouncedSearch(text);
  };

  return <TextInput {...inputProps} value={keyword} onChangeText={onKeywordChange} />;
};

export default SearchInput;
