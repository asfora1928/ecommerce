import React, { useEffect } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'




export default function Home() {

  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>
    </>
   
  )
}
