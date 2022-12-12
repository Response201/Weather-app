import React, { useEffect, useState } from "react";
import "./App.css";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { DisplayToday } from "./components/DisplayToday";
import { DisplayweatherList } from "./components/DisplayWeatherList";
import Loadning from "./components/Loadning";
import SearchCity from "./components/SearchCity";
import * as image from "./components/images";
function App() {
  const [city, setCity] = useState("täby");
  const [errorMsg, setErrorMsg] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherNow, setWeatherNow] = useState(null);
  const [cityLat, setCityLat] = useState("");
  const [cityLon, setCityLon] = useState("");
  const [loading, setloading] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  let url = ``;

  useEffect(() => {
    url = `${import.meta.env.VITE_URL}q=${city}&units=metric&APPID=${
      import.meta.env.VITE_KEY
    }`;
    if (city !== "") {
      setResponseData(null);
      setWeatherData(null);
      setWeatherNow(null);
      setErrorMsg("");
      setloading(true);
      fetch(url)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            setErrorMsg("Please search for a valid city 😩");
            setloading(false);
          }
        })
        .then((data) => {
          if (data && data.list) {
            setCityLat(data.city.coord.lat);
            setCityLon(data.city.coord.lon);
            setResponseData(data);
            setWeatherData(
              data.list.filter((item) => item.dt_txt.includes("12:00:00"))
            );
          }
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
        });
    }
  }, [city]);

  useEffect(() => {
    if (cityLon && cityLat) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=metric&APPID=${
        import.meta.env.VITE_KEY
      }`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setloading(false);
          console.log(data);
          setWeatherNow(data);
        })
        .catch((error) => {
          setloading(false);
        });
    }
  }, [cityLat, cityLon]);

  return (
    <article className="App">
      <section className="App___content">
        <section className="searchCity___container">
         
          <SearchCity
            city={city}
            setCity={setCity}
            responseData={responseData}
          />
          <div className="searchCity___errorMsg">
            {errorMsg && <p>{errorMsg}</p>}
          </div>
        </section>

        {loading && <Loadning />}

        {weatherNow && weatherData ? (
          <>
            <section className="sunset_time___container">
              <h1>{responseData && responseData.city.name.toUpperCase()}</h1>
              <div
               className="sunset_time___content"
              >
                <p>{localTime} </p>

                <p>
                  {sunrise}{" "}
                  <div className="icon_container"> <WiSunrise className="icon_sunrise" /> </div>
                </p>
                <p>
                  {sunset}{" "}
                  <div className="icon_container"> <WiSunset className="icon_sunrise" /> </div>
                </p>
              </div>
            </section>
            <section className="DisplayToday___container">
              {weatherNow && (
                <DisplayToday
                  item={weatherNow}
                  setLocalTime={setLocalTime}
                  setSunrise={setSunrise}
                  setSunset={setSunset}
                />
              )}
            </section>
            <section className="DisplayweatherList___container">
              {weatherData &&
                weatherData
                  .slice(1)
                  .map((item) => (
                    <DisplayweatherList item={item} key={item.dt_txt} />
                  ))}
            </section>
          </>
        ) : (
          ""
        )}
      </section>
    </article>
  );
}

export default App;
