import React from "react";
import moment from "moment";
import * as image from "./images";
import { DisplayIcon } from "./DisplayIcon";
import { useEffect } from "react";

export const DisplayToday = ({ item, setLocalTime,setSunrise, setSunset }) => {
  let timezone = item.timezone;
  let timeItem = item.dt;
  let sunriseItem = item.sys.sunrise;
  let sunsetItem = item.sys.sunset;
  let sunrise = moment
    .utc(sunriseItem, "X")
    .add(timezone, "seconds")
    .format("HH:mm ");
  let sunset = moment
    .utc(sunsetItem, "X")
    .add(timezone, "seconds")
    .format("HH:mm ");
  let localTime = moment
    .utc(timeItem, "X")
    .add(timezone, "seconds")
    .format("ddd HH:mm");

  useEffect(() => {
    if (localTime && sunset && sunrise) {
      setLocalTime(localTime);
      setSunrise(sunrise)
      setSunset(sunset)
    }
  }, [localTime, sunrise,sunset]);

  return (
    <section className="DisplayToday___content">
      <p>{item.weather[0].description} </p>

     
      <div>
        <p>Feels like: {item.main.feels_like} </p>
        <p> Humidity: {item.main.humidity} </p>

        <p> Temp: {item.main.temp} </p>
        <p>Max: {item.main.temp_max} </p>
        <p>Min: {item.main.temp_min} </p>

        <p> Wind {item.wind.speed} </p>
      </div>

      <div className="DisplayToday___image">
        <DisplayIcon item={item} />
      </div>
    </section>
  );
};
