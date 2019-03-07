import React, {useState, useEffect} from 'react'
import '../../style/cards/accordion.sass'

const AccordionCard = props => {
  const [active, setActive] = useState(false)
  return(
    <div className={`card card--no-padding accordion ${active ? 'active' : ''}`}>
      <div className="accordion__title accordion__section card card--no-bg" onClick={() => setActive(!active)}>
        {props.header}
      </div>
      <div className="tail accordion--hide-on-inactive"></div>
      <div className="accordion__section accordion--shrink-on-inactive">
        {props.children}
      </div>
      <div className="tail tail--inverse accordion--hide-on-inactive"></div>
      <div className="flex--align-center flex--between accordion__section cn__row--accent accordion--shrink-on-inactive">
        {props.footer}
      </div>
    </div>
  )
}

export default AccordionCard
