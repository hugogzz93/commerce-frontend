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
    <div className={`col-${size} index_detail__ic--sm`} key={i}>
      <ImageCard source={url}/>
    </div>
  ))

  return(
    <div className="index__detail grid-12">
      <div className="grid-12 col-8">
        <div className="image-row grid-12 col-12">
            {createImages(3)}
        </div>
        <div className="image-row grid-12 col-12">
            {createImages(4)}
        </div>
      </div>
      <div className="cn--vertical col-4 index__detail-profile">
        <div className="index-detail__profile-pic">
          <ImageCard source={images[0]} />
        </div>
        <div className="title">Benjamin Hardman</div>
        <div className="cn__row">
          <div className="text__pair ">
            <div className="text__key">882</div>
            <div className="text__value">Photos</div>
          </div>
          <div className="text__pair ">
            <div className="text__key">882</div>
            <div className="text__value">Follower</div>
          </div>
        </div>
        <p>
          Elita ad hic voluptatem temporibus quod dolor Corporis omnis nemo placeat reprehenderit sapiente odio odit?
          Aspernatur quibusdam architecto velit necessitatibus.
        </p>
        <p>
          Elita ad hic voluptatem temporibus quod dolor Corporis omnis nemo placeat reprehenderit sapiente odio odit?
          Aspernatur quibusdam architecto velit necessitatibus.
        </p>
        <div className="cn__row">
          <div className="text__pair--ver">
            <div className="text__key">Locations</div>
            <div className="text__value">Based in Iceland</div>
          </div>
        </div><div className="cn__row">
          <div className="text__pair--ver">
            <div className="text__key">Locations</div>
            <div className="text__value">Based in Iceland</div>
          </div>
        </div><div className="cn__row">
          <div className="text__pair--ver">
            <div className="text__key">Locations</div>
            <div className="text__value">Based in Iceland</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexDetail
