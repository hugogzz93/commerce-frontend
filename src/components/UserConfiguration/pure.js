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

  return (
    <div className="overlay ">
      <div className="flex__row">
        <Link to="/users/profile/edit">Profile</Link>
        <Link to="/users/products/edit">Products</Link>
      </div>
        <CarouselWrapper showThumbs={false}
                  showIndicators={false}
                  showStatus={false}
                  transitionTime={150}
        >
          <FormSlide/>
          <UserProducts/>
        </CarouselWrapper>

    </div>
  )
}
 export default withRouter(UserConfiguration)
