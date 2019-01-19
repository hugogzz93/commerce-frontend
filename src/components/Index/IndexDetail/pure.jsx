import React, { useEffect, useState } from 'react'
import ImageCard from '../../cards/ImageCard'
import '../../../style/indexDetail.sass'

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
    <div className="index__detail fade-in masonic" >
      { imageDivs }
    </div>
  )
}

export default IndexDetail
