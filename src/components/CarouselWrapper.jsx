import React, { useState } from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../style/overwrites/carousel.sass'

const CarouselWrapper = props => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const next = () => {
    setCurrentSlide(currentSlide + 1)
  }

  const prev = () => {
    setCurrentSlide(currentSlide - 1)
  }

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index)
    }
  }

  return (
    <div>
      <div className="button-array container--60">
        <div className={`btn ${currentSlide == 0 ? 'active' : ''}`} onClick={() => updateCurrentSlide(0)}>
            Profile
        </div>
        <div className={`btn ${currentSlide == 1 ? 'active' : ''}`} onClick={() => updateCurrentSlide(1)}>
            Products
        </div>
      </div>
      <Carousel
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        {...props} >
         { props.children }
      </Carousel>
    </div>
  )
}
export default CarouselWrapper
