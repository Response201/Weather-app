import React from "react";
import moment from "moment";
import { WiCelsius } from "react-icons/wi";
import { DisplayIcon } from "./DisplayIcon";
import "../App.css";
export const DisplayweatherList = ({ item }) => {
  let timeItem = item.dt_txt;

  let day = moment(timeItem).format("ddd");

  return (
    <section className="DisplayweatherList___content">
      <section className="DisplayweatherList___day_p"> 
      <p>{day}</p>
      </section>
     <section className="DisplayweatherList___PIcon_container"> 
      <p>{item.main.temp} </p> <div className="icon_container"> <WiCelsius className="icon_celsius" /></div></section>
      <section className="DisplayweatherList___image">
        <DisplayIcon item={item} />
      </section>
    </section>
  );
};
