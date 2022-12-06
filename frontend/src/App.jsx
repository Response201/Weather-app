import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("taby");
  const [state, setState] = useState("Sweden");
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState([]);
  let url = `${
    import.meta.env.VITE_URL
  }q=${city},${state}&units=${units}&APPID=${import.meta.env.VITE_KEY}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeatherData(data.list))
      .catch((error) => console.error("ERROR!!!", error))
      .finally(() => console.log("Request done"));
  }, []);

  if (weatherData.length === 40) {
    console.log(weatherData.map((item) => item.dt_txt));
  }

  return (
    <article className="App">
      <h1>Weather-app</h1>
    </article>
  );
}

export default App;
