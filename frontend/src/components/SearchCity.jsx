import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SearchCity = ({ city, setCity, responseData }) => {
  const [value, setValue] = useState('');

useEffect(() => {
  if(responseData){
  setTimeout(() => {
    setValue('')
  }, 200) }

}, [responseData])




  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Enter a city...'
        maxLength={20}
      />

      <button onClick={() => setCity(value)}>Search</button>
    </div>
  );
};

export default SearchCity;
