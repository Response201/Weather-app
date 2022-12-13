import React from "react";
import moment from "moment";
import { WiCelsius, WiHumidity, WiWindy, WiThermometer } from "react-icons/wi";
import { FiUser, FiChevronsUp, FiChevronsDown, FiWind } from "react-icons/fi";
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
        



<div className="DisplayToday___weatherData_content">

<div className="weatherData_content">
<i><FiUser /></i>
</div>
<div className="weatherData_content"><div className="weatherData_content___div"> <p>{Math.floor(item.main.feels_like)}  </p> <i > <WiCelsius /> </i> </div>
</div><div className="weatherData_content"><p >Feels like</p></div>
</div>

<div className="DisplayToday___weatherData_content">
<div className="weatherData_content">
<i> <WiHumidity /> </i> </div>
<div className="weatherData_content"> <p>{Math.floor(item.main.humidity)}  % </p>
</div><div className="weatherData_content"><p >Humidity</p></div>
</div>


       
<div className="DisplayToday___weatherData_content">

<div className="weatherData_content">
<i><WiThermometer /></i>
</div>
<div className="weatherData_content"> <div className="weatherData_content___div"><p>{Math.floor(item.main.temp)}   </p> <i > <WiCelsius /> </i> </div></div>
<div className="weatherData_content"><p >Temp</p></div>
</div>



<div className="DisplayToday___weatherData_content">

<div className="weatherData_content">
<i><FiChevronsUp /></i>
</div>
<div className="weatherData_content"> <div className="weatherData_content___div"><p>{Math.floor(item.main.temp_max)}</p> <i > <WiCelsius /> </i></div>
</div>
<div className="weatherData_content"><p> Max </p></div>
</div>

<div className="DisplayToday___weatherData_content">
<div className="weatherData_content">
<i><FiChevronsDown /></i></div>
<div className="weatherData_content"> <div className="weatherData_content___div"><p> {Math.floor(item.main.temp_min)}   </p> <i > <WiCelsius /> </i> </div>
</div><div className="weatherData_content"><p>Min</p></div>
</div>

<div className="DisplayToday___weatherData_content">

<div className="weatherData_content">
<i><FiWind /></i>
</div>
<div className="weatherData_content"><p> {Math.floor(item.wind.speed)}  m/s </p>
</div><div className="weatherData_content"><p >Wind</p></div>
</div>


        

      </section>

     
    </section>
  );
};
