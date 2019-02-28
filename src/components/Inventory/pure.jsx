import React, { useState, useEffect } from 'react'
import mergeByKey from 'array-merge-by-key'
import debounce from '../../lib/debounce'
import '../../style/inventory.sass'

const Inventory = props => {
  const [ userProducts, setUserProducts ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    props.getUserProducts({id: props.user_id})
          .then( items => setUserProducts(items))
  }, [props.user_id])

  const updateItemStock = ({id, stock}) => {
    const updatedItem = {...userProducts.find(e => e.id == id), stock}
    setUserProducts(mergeByKey('id', userProducts, [updatedItem]))
  }

  const userProductDivs = userProducts
  .filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
  .map(uProd => {
    const onInputChange = e => {
      const originalValue = uProd.stock
      const newValue = e.target.value
      updateItemStock({id: uProd.id, stock: newValue})

      debounce(() =>
        props.updateStock({stock: parseInt(newValue), id: uProd.id})
            .catch(() => updateItemStock({id: uProd.id, stock: originalValue}))
      , 300 )()
    }
    return (
      <div key={uProd.id} className="inv__item fade-in">
          <span>{uProd.name}</span>
          <div>
            <span>Stock</span>
            <input
              className="inv__stock-input no-spinner"
              type="number"
              data-id={uProd.id}
              value={uProd.stock}
              onChange={onInputChange}
            />
          </div>
        </div>
    )
  }
  
)

  return(
    <div class="content">
      <div className="inv__content container--90">
        <div className="inv__options">
          <div className="s__content">
            <input className="s__input" value={filter} onChange={e => setFilter(e.target.value)}/>
            <i className='fas fa-search'></i>
          </div>
        </div>
        <div className="inv__items">
          { userProductDivs }
        </div>
      </div>
    </div>
  )
}

export default Inventory
