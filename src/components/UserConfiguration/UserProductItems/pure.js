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
    <div className="card fade-in" key={product.id}>
      <div className="t--strong">{product.name}</div>
      <UserProductItemForm
        product_id={product.id}
        userProduct={userProductForEdit}
        user_id={user_id}
      />
      <div className="fade-in masonic masonic--col-2">
        { userProductItemDivs }
      </div>
    </div>
  )
}
 export default UserProductItems
