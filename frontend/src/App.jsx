import React, { useEffect, useState } from "react";
import "./App.css";
import { DisplayToday } from "./components/DisplayToday";
import { DisplayweatherList } from "./components/DisplayWeatherList";
import SearchCity from "./components/SearchCity";

function App() {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [errorMsg, setErrorMsg] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  let url = `${import.meta.env.VITE_URL}q=${city}&units=${units}&APPID=${
    import.meta.env.VITE_KEY
  }`;

  useEffect(() => {
    if (city !== "") {
      setResponseData(null);
      setWeatherData(null);
      setErrorMsg("");
      fetch(url)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            setErrorMsg("Please search for a valid city 😩");
          }
        })
        .then((data) => {
          if (data && data.list) {
            setResponseData(data);
            setWeatherData(
              data.list.filter((item) => item.dt_txt.includes("12:00:00"))
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [city]);

  return (
    <article className="App">
      <h1>Weather-app</h1>

      <section className="App__searchCity_container">
        <SearchCity city={city} setCity={setCity} />
        {errorMsg && <p>{errorMsg}</p>}
      </section>

      <section>
        <h1>{responseData && responseData.city.name}</h1>
      </section>

      {weatherData && <DisplayToday item={weatherData[0]} />}

      <section className="DisplayweatherList___container">
        {weatherData &&
          weatherData
            .slice(1)
            .map((item) => (
              <DisplayweatherList item={item} key={item.dt_txt} />
            ))}
      </section>
    </article>
  );
}

export default App;
