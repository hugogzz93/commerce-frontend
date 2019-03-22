import React, { useState, useEffect} from 'react'
import UserProductItemForm from '../UserProductItemForm'
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'
import HoverContainer from '../../cards/HoverContainer'

const UserProductItems = ({category, userId, ...props}) => {
  const [productForEdit, setProductForEdit] = useState(null)

  const productDivs = category.products.map(( product, i ) => (
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
          // src={`http://localhost:3002/download?filename=${product.image}&id=${userId}`}
          src={product.image}
          title={product.name}
          paragraphs={[product.price, 'Lorem Ipsum', 'Dolor sit amet']}
        />
      </HoverContainer>
    </div>
  ))

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
        <div className="fade-in masonic masonic--col-2"> { productDivs } </div> : 
        <div className="card card--no-bg">No Products</div> }
      </div>
    </div>
  )
}
 export default UserProductItems
