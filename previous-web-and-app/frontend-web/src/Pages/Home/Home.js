import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CarouselMain from '../../Components/Carousel/CarouselMain'
import ThinBanner from '../../Components/ThinBanner/ThinBanner'
import Footer from '../../Components/Footer/Footer'

function Home() {
  return (
    <div>
      <Navbar />
      <ThinBanner displayText="Tech gadgets"/>
      <CarouselMain />
      <ThinBanner displayText="Bicycles"/>
      <CarouselMain /> 
      <Footer />
    </div>
  )
}

export default Home
