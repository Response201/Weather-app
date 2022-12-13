import React, { useEffect, useState } from "react";
import "./App.css";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { DisplayToday } from "./components/DisplayToday";
import { DisplayweatherList } from "./components/DisplayWeatherList";
import Loadning from "./components/Loadning";
import SearchCity from "./components/SearchCity";
import moment from "moment";
import { DisplaySunAndTime } from "./components/DisplaySunAndTime";
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
  let date = [];

  for (let i = 1; i <= 4; i++) {
    date.push(moment().add(i, "days").format("YYYY-MM-DD 12:00:00"));
  }

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
            /* Take out weather for 4 days forward */
            setWeatherData(
              data.list.filter(
                (item) =>
                  item.dt_txt.includes(date[0]) ||
                  item.dt_txt.includes(date[1]) ||
                  item.dt_txt.includes(date[2]) ||
                  item.dt_txt.includes(date[3])
              )
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
            <DisplaySunAndTime
              responseData={responseData}
              sunrise={sunrise}
              sunset={sunset}
              localTime={localTime}
            />
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
                weatherData.map((item) => (
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
