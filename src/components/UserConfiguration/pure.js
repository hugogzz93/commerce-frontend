import React, { useState } from 'react'
import FormSlide from '../../components/FormSlide/index'
import UserProducts from './UserProducts/index'
import {  BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import CarouselWrapper from '../CarouselWrapper'



const UserConfiguration = props => {
  const [carouselControls, setCarouselControls] = useState({})
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="overlay content ">
      <div className="button-array container--60">
          <div className={`btn ${currentSlide == 0 ? 'active' : ''}`} onClick={() => {setCurrentSlide(0); carouselControls.setSlide(0)}}>
            Profile
        </div>
        <div className={`btn ${currentSlide == 1 ? 'active' : ''}`} onClick={() => {setCurrentSlide(1); carouselControls.setSlide(1)}}>
            Products
        </div>
      </div>
      <CarouselWrapper showThumbs={false}
                showIndicators={false}
                showStatus={false}
                transitionTime={150}
                controlSetter={setCarouselControls}
      >
        <FormSlide/>
        <UserProducts/>
      </CarouselWrapper>
    </div>
  )
}
 export default withRouter(UserConfiguration)
