import React from "react";
import moment from "moment";
import { WiCelsius, WiHumidity, WiWindy } from "react-icons/wi";
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
     
      <section className="DisplayToday___image">
        <DisplayIcon item={item} />
      </section>
     
      <section  className="DisplayToday___weatherData_container">
        <p>Feels like: {item.main.feels_like} <div className="icon_container"> <WiCelsius className="icon_celsius" /></div> </p>
        <p> Humidity: {item.main.humidity} <div className="icon_container"> <WiHumidity className="icon_humidity" /></div> </p>

        <p> Temp: {item.main.temp} <div className="icon_container"> <WiCelsius className="icon_celsius" /></div>  </p>
        <p>Max: {item.main.temp_max} <div className="icon_container"> <WiCelsius className="icon_celsius" /></div> </p>
        <p>Min: {item.main.temp_min} <div className="icon_container"> <WiCelsius className="icon_celsius" /></div> </p>

        <p> Wind {item.wind.speed} <div className="icon_container"> <WiWindy className="icon_wind" /></div> </p>
      </section>

     
    </section>
  );
};
