import React from "react";
import moment from "moment";
import { DisplayIcon } from "./DisplayIcon";
import "../App.css";
export const DisplayweatherList = ({ item }) => {
  let timeItem = item.dt_txt;

  let day = moment(timeItem).format("dddd");

  return (
    <section className="DisplayweatherList___content">
      <p>{day}</p>

     
      <p>{item.main.temp} C </p>
      <section className="DisplayweatherList___image">
        <DisplayIcon item={item} />
      </section>
    </section>
  );
};
