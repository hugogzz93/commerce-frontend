import React, { useState, useEffect} from 'react'
import UserProductItemForm from '../UserProductItemForm'
import { useProductContext } from '../UserProducts/pure'
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'
import HoverContainer from '../../cards/HoverContainer'

const UserProductItems = ({categoryId, userId, ...props}) => {
  const [{categories}, dispatch] = useProductContext()
  const [productForEdit, setProductForEdit] = useState(null)

  const category = categories.find(e => e.id == categoryId)


  return (
    <div>
      <div className="card fade-in grid-1 row-gap-15">
        <div className="t--strong">{category.name}</div>
        <UserProductItemForm
          categoryId={category.id}
          category={productForEdit}
          userId={userId}
        />
      </div>
      <div className="card fade-in">
        { category.products.length ?
        <div className="fade-in masonic masonic--col-2">
          {category.products.map(( product, i ) => (
            <div key={product.id}>
              <HoverContainer 
                detail={
                  <React.Fragment>
                    <div className="button" onClick={(e) => {e.stopPropagation(); console.log('deleted')}}>Delete</div>
                    <div className="button" onClick={ () => {
                      setProductForEdit(product)
                      const y = document.querySelector('#product-form').getBoundingClientRect().top
                      window.scroll({top: y, behavior: 'smooth'})
                    } }>Edit</div>
                  </React.Fragment>
                }
              >
                <HoverImageCard
                  src={product.image}
                  title={product.name}
                  paragraphs={[product.price, 'Lorem Ipsum', 'Dolor sit amet']}
                />
              </HoverContainer>
            </div>
          ))}
        </div> : 
        <div className="card card--no-bg">No Products</div> }
      </div>
    </div>
  )
}
 export default UserProductItems
