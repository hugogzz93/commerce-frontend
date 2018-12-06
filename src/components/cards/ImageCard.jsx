import React from 'react'
import '../../style/cards/imagecard.sass'

const ImageTag = ({source, alt}) => {
  return(
    <div 
      className="image-card"
      alt={alt}
      style={{backgroundImage: `url( ${source} )`}}
    >
    </div>
  )
}


export default ImageTag
