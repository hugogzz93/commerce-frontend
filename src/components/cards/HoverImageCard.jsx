import React, { useState } from 'react'
import '../../style/cards/hoverImageCard.sass'

const HoverImageCard = props => {
  const [optionsVisible, setOptionVisibility] = useState(false)
  const toggleOptionVisibility = () => ( setOptionVisibility(!optionsVisible) )

  const optionsDiv = props.options && (
    <div className={`image__hover-options ${optionsVisible ? 'active' : ''}`}>
      {props.options}
    </div>
  )
  return(
    <div className={ `image__hover-container shadow--spec` }>
      <figure className={`image__hover-card ${optionsVisible ? 'active' : ''}`}  onClick={toggleOptionVisibility}>
        <div className="image__hover-image">
          <img src={props.src} alt="" />
        </div>
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
