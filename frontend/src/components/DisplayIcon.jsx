import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as image from "./images";
export const DisplayIcon = ({ item }) => {
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    if (item.weather[0].icon.includes("01d")) {
      setWeatherIcon(image.oneD);
    } else if (item.weather[0].icon.includes("01n")) {
      setWeatherIcon(image.oneN);
    } else if (item.weather[0].icon.includes("02d")) {
      setWeatherIcon(image.twoD);
    } else if (item.weather[0].icon.includes("02n")) {
      setWeatherIcon(image.twoN);
    } else if (item.weather[0].icon.includes("03")) {
      setWeatherIcon(image.three);
    } else if (item.weather[0].icon.includes("04")) {
      setWeatherIcon(image.four);
    } else if (item.weather[0].icon.includes("09")) {
      setWeatherIcon(image.nine);
    } else if (item.weather[0].icon.includes("10")) {
      setWeatherIcon(image.ten);
    } else if (item.weather[0].icon.includes("11")) {
      setWeatherIcon(image.eleven);
    } else if (item.weather[0].icon.includes("13")) {
      setWeatherIcon(image.thirteen);
    } else if (item.weather[0].icon.includes("15")) {
      setWeatherIcon(image.fifty);
    }
  }, [item]);

  return <img src={weatherIcon} alt="display weather" style={{heigth:'100%', width:'100%'}} />;
};
