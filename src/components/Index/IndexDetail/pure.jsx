import React, { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel";
import ImageCard from '../../cards/ImageCard'
import HoverImageCard from '../../cards/HoverImageCard'
import HoverContainer from '../../cards/HoverContainer'
import '../../../style/indexDetail.sass'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../../style/overwrites/carousel.sass'

const IndexDetail = (props) => {
  const [user, setUser] = useState({id: props.id, userProducts: []})

  useEffect(() => {
    props.getUserDetails({id: props.id, product_id: props.product_id}).then(setUser)
  }, [props])


  const userProducts = user.userProducts.map((up, i) => {
    return (
      <HoverContainer key={up.id}
        detail={
          <div className="button"
            onClick={() => props.addProductItem({id: up.id, vendor_id: up.user_id, amount: 1})}
          >Add To Cart</div>
        }
      >
        <HoverImageCard 
          src={`http://localhost:3002/download?filename=${up.image}&id=${user.id}`}
          title={up.name}
          paragraphs={[up.price, 'Lorem Ipsum', 'Dolor sit amet']}
        />
      </HoverContainer>
    )
  })


  return(
      <div className="index__detail">
        <Carousel showThumbs={false}
                  showIndicators={false}
                  showStatus={false}
                  showArrowns={false}
                  useKeyboardArrows={true}
                  transitionTime={150}
                >
                    <div className="fade-in-list masonic masonic--col-2">
                      { userProducts }
                    </div>
                    <div>
                      <div className="card card--info card--info-red">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <br />
                        <p className="p--small">{user.country} / {user.city}</p>
                        <p className="p--small">{user.street} / {user.street_2} / {user.street_number}</p>
                      </div>
                    </div>
        </Carousel>
      </div>
  )
}

export default IndexDetail
