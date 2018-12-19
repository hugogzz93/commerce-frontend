import React, { useEffect, useState } from 'react'
import ImageCard from '../cards/ImageCard'
import '../../style/indexDetail.sass'

const images = [
  'https://images.unsplash.com/photo-1544108182-8810058c3a7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100',
  'https://images.unsplash.com/photo-1544077960-604201fe74bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100',
  'https://images.unsplash.com/photo-1540206458-3b96c6332706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100',
  'https://images.unsplash.com/photo-1540206458-3b96c6332706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100'
]


const IndexDetail = (props) => {
  const [user, setUser] = useState({id: props.id})

  useEffect(() => {
    props.getUserDetails(props.id).then(setUser)
  }, [props])

  return(
    <div className="index__detail grid-12" >
      {user.name}
    </div>
  )
}

export default IndexDetail
