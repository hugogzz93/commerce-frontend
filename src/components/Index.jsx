import React, { Component, useEffect, useState } from 'react'
import { sendAction } from '../lib/api'
import ThumbCard from './cards/ThumbCard'
import '../style/index.sass'

const buildItemQuery = ({name}) => `
  {
    users(search: {
      name: "${name}"
    }) {
      title: name
      subtitle: id
    }
  }
`

const Index = (props) => {
  const [options, setOptions] = useState([])
  const [detail, setDetail] = useState({})
  const [filter, setFilter] = useState({name: ''})
  const { title } = props
  const selectedItem = 0

  const handleSearchChange = (event) => {
    setFilter({...filter, name: event.target.value})
  }

  const indexItems = options.map((option, i) => (
    <div className='index__item fade-in' key={i}>
      <ThumbCard 
        title={option.title}
        subtitle={option.subtitle} 
      />
    </div>
  ))

  useEffect(() => {
    sendAction(buildItemQuery(filter))
      .then(res => setOptions(res.users))
  }, [title, filter])

  return(
    <div className='index__container' >
      <div className='index__search-container'>
        <input 
          className='index__search'
          placeholder='search'
          value={filter.name}
          onChange={ handleSearchChange }
        />
        <i className='fas fa-search'></i>
      </div>
      <div className='index__content-list fade-in-list'>
        {indexItems}
      </div>
      <div className='index__detail'>
        {/* {detail} */}
      </div>
    </div>
  )
}

export default Index
