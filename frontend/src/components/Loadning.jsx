import React from 'react'
import Lottie from "lottie-react";
import loading from '../assets/lotties/loading.json'

const Loadning = () => {
  return (
    <div>
      <Lottie animationData={loading} loop={true} />
    </div>
  )
}

export default Loadning