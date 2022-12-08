import React from "react";
import { DisplayIcon } from "./DisplayIcon";
import "../App.css";
export const DisplayweatherList = ({ item }) => {
  




  return (
    <section className="DisplayweatherList___content">
    
        <p>{item.dt_txt.slice(0,10)} </p>

        <p>{item.weather[0].description} </p>

      
<section className="DisplayweatherList___image" >

<DisplayIcon item={item} />


</section>



      
    </section>
  );
};
