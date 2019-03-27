import React, { useState, useEffect} from 'react'
import UserProductItemForm from '../UserProductItemForm'
import { useProductContext } from '../UserProducts/pure'
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'
import HoverContainer from '../../cards/HoverContainer'
import iziToast from 'izitoast'
import RPC from '../../../lib/RPC.js'

const UserProductItems = ({categoryId, userId, ...props}) => {
  const [{categories}, dispatch] = useProductContext()
  const [productForEdit, setProductForEdit] = useState(null)

  const category = categories.find(e => e.id == categoryId)
  const scrollToForm = () => {
    const y = document.querySelector('#product-form').getBoundingClientRect().top
    window.scroll({top: y, behavior: 'smooth'})
  }

  const deleteProduct = product => {

    props.deleteProduct({id: product.id})
         .then(RPC.handleResponseStatus({ 
           successMsg: 'Product Deleted',
           successFn: () => {
            dispatch({
              type: 'deleteProduct',
              payload: {
                categoryId,
                productId: product.id
              }
            })
           }
         }))
  }

  return (
    <div>
      <UserProductItemForm
        category={category}
        product={productForEdit}
        userId={userId}
        onSubmit={() => setProductForEdit(null)}
      />
      <div className="card fade-in">
        { category.products.length ?
        <div className="fade-in masonic masonic--col-2">
          {category.products.map(( product, i ) => (
            <div key={product.id}>
              <HoverContainer 
                detail={
                  <React.Fragment>
                    <div className="button" onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct(product) 
                    }}>Delete</div>
                    <div className="button" onClick={ () => {
                      setProductForEdit(product)
                      scrollToForm()
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
