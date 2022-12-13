import React from 'react'
import { WiSunrise, WiSunset } from "react-icons/wi";
export const DisplaySunAndTime = ({responseData, sunrise, sunset, localTime}) => {
  return (
    <> 
    <section className="sunset_time___container">
    <h1>{responseData && responseData.city.name.toUpperCase()}</h1>
    <div className="sunset_time___content">
      <p>{localTime} </p>

      <p>
        {sunrise}{" "}
        <div className="icon_container">
          {" "}
          <WiSunrise className="icon_sunrise" />{" "}
        </div>
      </p>
      <p>
        {sunset}{" "}
        <div className="icon_container">
          {" "}
          <WiSunset className="icon_sunrise" />{" "}
        </div>
      </p>
    </div>
  </section>


  </>
  )
}
