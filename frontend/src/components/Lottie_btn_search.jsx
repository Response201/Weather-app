import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import lottieAnimation from "../assets/lotties/position.json";
export const Lottie_btn_search = ({ search, setSearch }) => {
  const [isFirstRun, setisFirstRun] = useState(true);
  const lottieRef = useRef();

  useEffect(() => {


      if (isFirstRun && !search) {
        lottieRef.current.goToAndStop(13, 13);
        setisFirstRun(false);
      } else {

        if (!isFirstRun && search){
        
          lottieRef.current.playSegments([14,31], true);
          setSearch(false)
        }
      }

    
  }, [search]);

  return (
  
      <Lottie
        animationData={lottieAnimation}
        progress={0}
        loop={false}
        autoPlay={false}
        lottieRef={lottieRef}
        className="lottie"
      />
    
  );
};
