import React, { useState, useEffect} from 'react'
import UserProductItemForm from '../UserProductItemForm'
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'

const sizes = [ 'big', 'small' ]

const getRandom = myArray => ( myArray[Math.floor(Math.random() * myArray.length)])

const UserProductItems = ({product, user_id, ...props}) => {

  useEffect(() => {
    props.getUserProductItems({user_id, product_id: product.id})
  }, [user_id])

  const userProductItemDivs = props.userProductItems.map(( up, i ) => (
    <div className={``} key={i}>
      <HoverImageCard 
        src={`http://localhost:3002/download?filename=${up.image}&id=${user_id}`}
        title={up.name}
        paragraphs={[up.price, 'Lorem Ipsum', 'Dolor sit amet']}
      />
    </div>
  ))

  return (
    <div className="card up__li fade-in" key={product.id}>
      <div className="text__pair--ver">
        <div className="text__key">{product.name}</div>
      </div>
      <div className="up__canvas">
        <UserProductItemForm product_id={product.id}/>
        <div className="fade-in masonic masonic--col-2">
          { userProductItemDivs }
        </div>
      </div>
      <div className="button btn--danger"
        onClick={() => props.removeProducts({user_id, productIds: [product.id]})}
        data-product-id={product.id}>X</div>
    </div>
  )
}
 export default UserProductItems
