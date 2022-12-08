import React from "react";
import { useState } from "react";

const SearchCity = ({ city, setCity }) => {
  const [value, setValue] = useState(city);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={() => setCity(value)}>Search</button>
    </div>
  );
};

export default SearchCity;
