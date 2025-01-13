import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './buypage.module.scss'
import TextField from "@mui/material/TextField";
import ThinBanner from '../../Components/ThinBanner/ThinBanner';
import CarouselMain from '../../Components/Carousel/CarouselMain';

function BuyPage() {
  return (
    <div>
        <Navbar />
        <div className={styles.search}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
        />
        <button>Explore categories</button>
        </div>

      <ThinBanner displayText="Tech gadgets"/>
      <CarouselMain />
      <ThinBanner displayText="Bicycles"/>
      <CarouselMain /> 
    </div>
  )
}

export default BuyPage
