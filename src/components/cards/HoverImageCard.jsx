import React, { useState } from 'react'
import '../../style/cards/hoverImageCard.sass'

const HoverImageCard = props => {

  const active = props.active
  const optionsDiv = props.options && (
    <div>
      {props.options}
    </div>
  )
  return(
    <div>
      <figure className={`image__hover-card ${active ? 'active' : ''}`} >
        <img src="https://images.unsplash.com/photo-1552152370-fb05b25ff17d" alt="" />
        <figcaption>
            <h2>{props.title}</h2>
            {props.paragraphs.map((p,i) => (
              <p key={i}>{p}</p>
            ))}
        </figcaption>
      </figure>
      {optionsDiv}
    </div>
  )
}

export default HoverImageCard
