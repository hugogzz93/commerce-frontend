import React from 'react'
import '../../style/cards/hoverImageCard.sass'

const HoverImageCard = props => {
  return(
    <figure>
      <img src={props.src} alt="" />
      <figcaption>
          <h2>{props.title}</h2>
          {props.paragraphs.map((p,i) => (
            <p key={i}>{p}</p>
          ))}
      </figcaption>
    </figure>
  )
}

export default HoverImageCard
