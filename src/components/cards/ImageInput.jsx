import React, { useState, useEffect } from 'react'
import '../../style/cards/imageInput.sass'

const ImageInput = () => {
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)



  const changeImage = e => {
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = e => {
      setImage(e.target.result)
      setFile(file)
    }

    reader.readAsDataURL(file)
  }


  return (
    <div className="img-input__container"
          style={ image && ({
              backgroundImage: `url(${image})`,
              border: 'none'
            })
          }
          onClick={e => e.target.querySelector('input').click()}
      >
      {/* <div className="img-input__name">Tets</div> */}
      <input className="img-input" type="file" onChange={changeImage} onClick={e => e.stopPropagation()}/>
    </div>
  )
}

export default ImageInput
