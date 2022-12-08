import React from "react";
import { DisplayIcon } from "./DisplayIcon";

export const DisplayToday = ({item}) => {




  return (
    
    <section className="DisplayToday___content">
        <p>{item.dt_txt.slice(0,10)} </p>

        <p>{item.weather[0].description} </p>

      
<div className="DisplayToday___image"  >

<DisplayIcon item={item} />


</div>



      </section>
   
  );
};
