import { debounce } from "lodash";
import React, { useState, useCallback } from "react";
import TextInput from "./TextInput";

function SearchInput({ onChange, debounceTime = 500, ...inputProps }) {
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (onChange !== undefined) {
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
}

export default SearchInput;
