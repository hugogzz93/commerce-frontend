import React from 'react'
import ImageCard from './cards/ImageCard'
import '../style/indexDetail.sass'

const images = [
  'https://images.unsplash.com/photo-1544108182-8810058c3a7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100',
  'https://images.unsplash.com/photo-1544077960-604201fe74bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100',
  'https://images.unsplash.com/photo-1540206458-3b96c6332706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100',
  'https://images.unsplash.com/photo-1540206458-3b96c6332706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100'
]

const IndexDetail = (props) => {

  const createImages = (size) => images.map((url, i) => (
    <div className={`col-${size}`} key={i} style={{padding: '0 3%', height: '15rem'}}>
      <ImageCard source={url}/>
    </div>
  ))

  return(
    <div className="index__detail grid-12">
      <div className="image-row grid-12 col-12">
          {createImages(3)}
      </div>
      <div className="image-row grid-12 col-12">
          {createImages(4)}
      </div>

    </div>
  )
}

export default IndexDetail
