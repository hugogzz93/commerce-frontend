import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel";
import ImageCard from '../../cards/ImageCard'
import '../../../style/indexDetail.sass'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../../style/overwrites/carousel.sass'

const img = [
  'https://images.unsplash.com/photo-1544108182-8810058c3a7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
  'https://images.unsplash.com/photo-1544077960-604201fe74bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
  'https://images.unsplash.com/photo-1540206458-3b96c6332706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
  'https://images.unsplash.com/photo-1540206458-3b96c6332706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9'
]

const sizes = [ 'big', 'small' ]

const getRandom = myArray => ( myArray[Math.floor(Math.random() * myArray.length)])

const IndexDetail = (props) => {
  const [user, setUser] = useState({id: props.id})

  useEffect(() => {
    props.getUserDetails(props.id).then(setUser)
  }, [props])


  const imageDivs = Array.from({length: 10}).map((k, i) => {
      return <div className={`masonic--${getRandom(sizes)}`} key={i}>
        <ImageCard source={getRandom(img)} alt={''} />
      </div>
  })


  return(
      <div className="index__detail">
        <Carousel showThumbs={false}
                  showIndicators={false}
                  showStatus={false}
                  showArrowns={false}
                  useKeyboardArrows={true}
                  transitionTime={150}
                  dynamicHeight={true}
                >
                    <div className="fade-in masonic">
                      { imageDivs }
                    </div>
                    <div>
                      <div className="card">
                        <h1>user.name</h1>
                        <h5>user.email</h5>
                      </div>
                    </div>
        </Carousel>
      </div>
  )
}

export default IndexDetail
