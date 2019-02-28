import React, { useState, useEffect } from 'react'
import mergeByKey from 'array-merge-by-key'
import debounce from '../../lib/debounce'
import '../../style/inventory.sass'

const Inventory = props => {
  const [ userProducts, setUserProducts ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ debouncedRegistry, setDebounced] = useState({})

  useEffect(() => {
    if(!props.user_id) return
    props.getUserProducts({id: props.user_id})
          .then( items => setUserProducts(items))
  }, [props.user_id])

  const registerDebounced = (id, fn) => {
    if(debouncedRegistry[id]) return debouncedRegistry[id]
    const debouncedFn = debounce(fn, 300)
    setDebounced({...debouncedRegistry, [id]: debouncedFn})
    return debouncedFn
  }

  const updateItemStock = ({id, stock}) => {
    const updatedItem = {...userProducts.find(e => e.id == id), stock}
    setUserProducts(mergeByKey('id', userProducts, [updatedItem]))
  }

  const userProductDivs = userProducts
  .filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))
  .map(uProd => {
    const updateItems = registerDebounced(uProd.id, (value, originalValue, id) => 
          props.updateStock({stock: parseInt(value), id})
                .catch(() => updateItemStock({id, stock: originalValue}))
    ) 

    const onInputChange = e => {
      const originalValue = uProd.stock
      const newValue = e.target.value
      updateItemStock({id: uProd.id, stock: newValue})
      updateItems(newValue, originalValue, uProd.id)
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
    <div className="content">
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
