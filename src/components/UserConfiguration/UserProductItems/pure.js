import React, { useState, useEffect} from 'react'
import UserProductItemForm from '../UserProductItemForm'
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'
import HoverContainer from '../../cards/HoverContainer'

const UserProductItems = ({product, user_id, ...props}) => {
  const [userProductForEdit, setUserProductForEdit] = useState(null)

  useEffect(() => {
    props.getUserProductItems({user_id, product_id: product.id})
  }, [user_id, product])

  const userProductItemDivs = props.userProductItems.map(( up, i ) => (
    <div className={``} key={up.id}>
      <HoverContainer 
        detail={
          <React.Fragment>
            <div className="button" onClick={(e) => {e.stopPropagation(); console.log('deleted')}}>Delete</div>
            <div className="button" onClick={ () => {
              setUserProductForEdit(up)
              const y = document.querySelector('.up__item-form').getBoundingClientRect().top
              window.scroll({top: y, behavior: 'smooth'})
            } }>Edit</div>
          </React.Fragment>
        }
      >
        <HoverImageCard 
          src={`http://localhost:3002/download?filename=${up.image}&id=${user_id}`}
          title={up.name}
          paragraphs={[up.price, 'Lorem Ipsum', 'Dolor sit amet']}
        />
      </HoverContainer>
    </div>
  ))

  return (
    <div className="card up__li fade-in" key={product.id}>
      <div className="text__pair--ver">
        <div className="text__key">{product.name}</div>
      </div>
      <div className="up__canvas">
        <UserProductItemForm
          product_id={product.id}
          userProduct={userProductForEdit}
          user_id={user_id}
        />
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
