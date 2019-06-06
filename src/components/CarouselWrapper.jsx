import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../style/overwrites/carousel.sass";

const CarouselWrapper = ({ controlSetter, ...props }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const setSlide = index => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (controlSetter) controlSetter({ setSlide, next, prev });
  }, []);

  return (
    <Carousel selectedItem={currentSlide} onChange={setSlide} {...props}>
      {props.children}
    </Carousel>
  );
};
export default CarouselWrapper;
