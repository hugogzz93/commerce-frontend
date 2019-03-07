import React from 'react'
import roots from '../../images/roots.svg'
import '../../style/cards/thumbcard.sass'

const ThumbCard = (props) => {
  const { title, subtitle, selected, onClick } = props

  return(
    <div className={`card card--clickable flex--row flex--align-center ${props.className}`} onClick={onClick}>
      <img className='thumb-nail' src={roots} alt={'thumbnail'}/>
      <div className='flex--col t--align-l'>
        <div className='t--strong'>
          { title }
        </div>
        <div className=''>
          { subtitle }
        </div>
      </div>
    </div>
  )
}

export default ThumbCard
