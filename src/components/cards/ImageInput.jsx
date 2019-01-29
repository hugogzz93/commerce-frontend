import React, { useState, useEffect } from 'react'
import '../../style/cards/imageInput.sass'

const ImageInput = props => {
  const [image, setImage] = useState(null)

  const changeImage = ({target: { files: [file]}})  => {
    const reader = new FileReader()
    reader.onload = e => {
      setImage(e.target.result)
      props.setFile(file)
    }

    reader.readAsDataURL(file)
  }


  return (
    <div className="img-input__container"
          style={ image && ({
              backgroundImage: `url(${image})`,
              border: '1px solid #0085ff'
            })
          }
          onClick={e => e.target.querySelector('input').click()}
      >
      <input className="img-input"
             type="file"
             onChange={changeImage}
             onClick={e => e.stopPropagation()}/>
    </div>
  )
}

export default ImageInput
