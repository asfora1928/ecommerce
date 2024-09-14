import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
useState

export default function HeartIcon() {
    const [isRed, setIsRed] = useState(false)
    const toggleColor = ()=>{
      setIsRed(!isRed)}
  return (
    <>
      <FaHeart
      onClick={toggleColor}
      style={{color:isRed? 'red': '#b0b0b0', cursor: 'pointer' , fontSize: "24px"}}
      
      />
    </>
  )
}
