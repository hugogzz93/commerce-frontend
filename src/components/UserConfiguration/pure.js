import React, { useState } from "react";
import FormSlide from "../../components/FormSlide/index";
import Input from '../../components/Inputs/TextInput/index.jsx'
import UserProducts from "./UserProducts/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CarouselWrapper from "../CarouselWrapper";
import { Carousel } from 'react-responsive-carousel'

import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import Spinner from '../Spinner.jsx'
import AddressCard from './addressCard.jsx'


const FETCH_ADRESSES = gql`
  query fetchAddresses($userId: ID!) {
    users(query: {id: $userId}) {
      addresses {
        id
        country
        fullName
        street1
        street2
        city
        zip
        phone
        securityCode
        instructions
      }
    }
  }
`

const UserAddresses = props => {
  return (
  <Query query={FETCH_ADRESSES} variables={{userId: props.userId}}>
      {({loading, error, data}) => {
        if(loading) return  <Spinner/>
        if(error) return  <div>Error</div>
        const cards = data.users[0].addresses.map(a => <div className="col-4" key={a.id}><AddressCard address={a} /></div> )
        return (
          <div className="grid-12 row-gap-10">
            {cards}
          </div>
        )
      }}
  </Query>) 
}

const UserConfiguration = props => {
  const [carouselControls, setCarouselControls] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  if(!props.userId) return <grid-12><Spinner/></grid-12>
  return (
    <div className="grid-12">
      <div className="col-2 flex--col">
        <Link to='/users/edit/profile'>
          <div className="card--no-bg no--margin clickable">Profile</div>
        </Link>
        <Link to='/users/edit/products'>
          <div className="card--no-bg no--margin clickable">Products</div>
        </Link>
        <Link to='/users/edit/addresses'>
          <div className="card--no-bg no--margin clickable">Addresses</div>
        </Link>
      </div>

      <div className="col-10">
        <Switch>
          <Route path="/users/edit/profile" component={FormSlide}/>
          <Route path="/users/edit/products" component={UserProducts}/>
          <Route path="/users/edit/addresses" component={() => (
            <UserAddresses userId={props.userId}/>
          )}/>
        </Switch>
      </div>

      {/* <div className="col-10"> */}

        {/* <Carousel */}
        {/*   showThumbs={false} */}
        {/*   showIndicators={false} */}
        {/*   showStatus={false} */}
        {/*   transitionTime={150} */}
        {/*   selectedItem={currentSlide} */}
        {/* > */}
        {/*   <FormSlide/> */}
        {/*   <UserProducts /> */}
        {/*   <UserAddresses userId={props.userId}/> */}
        {/* </Carousel> */}
      {/* </div> */}
      
    </div>
  );
};
export default UserConfiguration;
