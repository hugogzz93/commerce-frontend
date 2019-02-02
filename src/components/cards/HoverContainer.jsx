import React, { useEffect, useState } from 'react'

const HoverContainer = props => {
  const [active, setActive] = useState(false)

  return (
    <div className={ `hover__container ${active ? 'active' : '' }` } onClick={() => setActive(!active)}>
      <div className="hover__img">
        {props.children}
      </div>
      <div className="hover__detail">
        {props.detail}
      </div>
    </div>
  )
}

export default HoverContainer
