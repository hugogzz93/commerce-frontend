import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel";
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'
import HoverContainer from '../../cards/HoverContainer'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../../style/overwrites/carousel.sass'

const IndexDetail = (props) => {
  const [vendor, setVendor] = useState({id: props.id, products: []})

  useEffect(() => {
    props.getVendorDetails({
      id: props.id,
      categoryId: props.categoryId
    }).then(setVendor)
  }, [props])


  const productDivs = vendor.products.map((up, i) => {
    return (
      <HoverContainer key={up.id}
        detail={
          <div className="button"
            onClick={() => props.addProductItem({id: up.id, vendor_id: up.user_id, amount: 1})}
          >Add To Cart</div>
        }
      >
        <HoverImageCard 
          src={up.image}
          title={up.name}
          paragraphs={[up.price, 'Lorem Ipsum', 'Dolor sit amet']}
        />
      </HoverContainer>
    )
  })


  return(
      <Carousel showThumbs={false}
                showIndicators={false}
                showStatus={false}
                showArrowns={false}
                useKeyboardArrows={true}
                transitionTime={150}
              >
                  <div className="masonic masonic--col-2">
                    { productDivs }
                  </div>
                  <div>
                    <div className="card card--theme-red">
                      <p>{vendor.name}</p>
                      <p>{vendor.email}</p>
                      <p>{vendor.phone}</p>
                      <br />
                      <p className="p--small">{vendor.country} / {vendor.city}</p>
                      <p className="p--small">{vendor.street} / {vendor.street_2} / {vendor.street_number}</p>
                    </div>
                  </div>
      </Carousel>
  )
}

export default IndexDetail
