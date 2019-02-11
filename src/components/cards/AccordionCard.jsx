import React, {useState, useEffect} from 'react'
import '../../style/cards/accordion.sass'

const AccordionCard = props => {
  const [active, setActive] = useState(false)
  return(
    <div className={`accordion ${active ? 'active' : ''}`}>
      <div className="accordion__title" onClick={() => setActive(!active)}>
        {props.header}
      </div>
      <div className="tail accordion--hide-on-inactive"></div>
      <div className="accordion__body">
        {props.children}
      </div>
      <div className="tail tail--inverse accordion--hide-on-inactive"></div>
      <div className="accordion__footer cn__row--accent">
        {props.footer}
      </div>
    </div>
  )
}

export default AccordionCard
