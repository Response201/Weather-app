import React from "react";
import { DisplayIcon } from "./DisplayIcon";

export const DisplayToday = ({item}) => {




  return (
    <>
      <div>
        <p>{item.dt_txt} </p>

        <p>{item.weather[0].description} </p>

      
<div style={{heigth:'150px', width:'150px'}}  >

<DisplayIcon item={item} />


</div>



      </div>
    </>
  );
};
