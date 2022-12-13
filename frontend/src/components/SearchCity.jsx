import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Lottie_btn_search } from "./Lottie_btn_search";

const SearchCity = ({ city, setCity, responseData }) => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (responseData) {
      setTimeout(() => {
        setValue("");
        setCity("");
      }, 200);
    }
  }, [responseData]);

  const onClickSearch = () => {
    setCity(value);
    setSearch(true);
  };

  return (
    <div className="SearchCity___container">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a city..."
        maxLength={20}
      />

      <button onClick={onClickSearch}>
        <Lottie_btn_search search={search} setSearch={setSearch} />
      </button>
    </div>
  );
};

export default SearchCity;
