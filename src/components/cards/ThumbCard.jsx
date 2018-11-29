import React, { Component } from 'react'
import roots from '../../images/roots.svg'
import '../../style/cards/thumbcard.sass'

const ThumbCard = (props) => {
  const { title, subtitle } = props

  return(
    <div className='thumb-card'>
      <img className='thumb-card__img' src={roots}/>
      <div className='thumb-card__main'>
        <div className='thumb-card__title'>
          { title }
        </div>
        <div className='thumb-card__subtitle'>
          { subtitle }
        </div>
      </div>
    </div>
  )
}

export default ThumbCard
