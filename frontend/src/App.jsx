import React, { useEffect, useState } from "react";
import "./App.css";
import { DisplayToday } from "./components/DisplayToday";
import { DisplayweatherList } from "./components/DisplayWeatherList";
import Loadning from "./components/Loadning";
import SearchCity from "./components/SearchCity";
import * as image from "./components/images";
function App() {
  const [city, setCity] = useState("");
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
          <h1>Weather-app</h1>
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
            <section>
              <h1>{responseData && responseData.city.name}</h1>
              <div
                style={{
                  whiteSpace: "nowrap",
                  display: "flex",
                  width: "80vw",
                  maxWidth:'400px',
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <p>{localTime} </p>

                <p>
                  {sunrise}{" "}
                  <img
                    src={image.sunrise}
                    alt="sunrise"
                    style={{ width: "15px", height: "14px" }}
                  />{" "}
                </p>
                <p>
                  {sunset}{" "}
                  <img
                    src={image.sunset}
                    alt="sunset"
                    style={{ width: "15px", height: "14px" }}
                  />{" "}
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
