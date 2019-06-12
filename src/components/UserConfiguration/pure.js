import React, { useState } from "react";
import FormSlide from "../../components/FormSlide/index";
import Input from "../../components/Inputs/TextInput/index.jsx";
import UserProducts from "./UserProducts/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CarouselWrapper from "../CarouselWrapper";
import { Carousel } from "react-responsive-carousel";

import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Spinner from "../Spinner.jsx";
import AddressCard from "./addressCard.jsx";
import { AddressFragments } from "../../constants/fragments";
import "../../style/user_configuration.css";

const FETCH_ADRESSES = gql`
  query fetchAddresses($userId: ID!) {
    users(query: { id: $userId }) {
      addresses {
        ...fields
      }
    }
  }
  ${AddressFragments.fields}
`;

const CreateAddressButton = props => {
  return (
    <div className="card flex--col flex--centered" onClick={props.onClick}>
      <div className="t--size-b1 t--gray">New Address</div>
      <div className="uc__plus">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 161.2 161.2"
          enableBackground="new 0 0 161.2 161.2"
        >
          <circle
            className="uc__path"
            fill="none"
            stroke="#abc"
            strokeWidth="2"
            strokeMiterlimit="10"
            cx="80.6"
            cy="80.6"
            r="62.1"
          />

          <polyline
            className="path"
            fill="none"
            stroke="#abc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="80,40 
                80,120"
          />

          <polyline
            className="path"
            fill="none"
            stroke="#abc"
            strokeWidth="3"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="40,80 
                120,80"
          />

          <circle
            className="uc__spin"
            fill="none"
            stroke="#abc"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeDasharray="12.2175,12.2175"
            cx="80.6"
            cy="80.6"
            r="73.9"
          />
        </svg>
      </div>
    </div>
  );
};

const UserAddresses = props => {
  const [creating, setCreating] = useState(false);
  return (
    <Query query={FETCH_ADDRESSES} variables={{ userId: props.userId }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <div>Error</div>;
        const cards = data.addresses.map(a => (
          <div className="col-4" key={a.id}>
            <AddressCard address={a} userId={props.userId} />
          </div>
        ));
        return (
          <div className="grid-12 col-gap-20 row-gap-10">
            <div className="col-4">
              {creating ? (
                <AddressCard
                  userId={props.userId}
                  onCompleted={() => setCreating(false)}
                />
              ) : (
                <CreateAddressButton onClick={() => setCreating(true)} />
              )}
            </div>
            {cards}
          </div>
        );
      }}
    </Query>
  );
};

const UserConfiguration = props => {
  const [carouselControls, setCarouselControls] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!props.userId)
    return (
      <grid-12>
        <Spinner />
      </grid-12>
    );
  return (
    <div className="grid-12">
      <div className="col-2 flex--col">
        <Link to="/users/edit/profile">
          <div className="card--no-bg no--margin clickable">Profile</div>
        </Link>
        <Link to="/users/edit/products">
          <div className="card--no-bg no--margin clickable">Products</div>
        </Link>
        <Link to="/users/edit/addresses">
          <div className="card--no-bg no--margin clickable">Addresses</div>
        </Link>
      </div>

      <div className="col-10">
        <Switch>
          <Route path="/users/edit/profile" component={FormSlide} />
          <Route path="/users/edit/products" component={UserProducts} />
          <Route
            path="/users/edit/addresses"
            component={() => <UserAddresses userId={props.userId} />}
          />
        </Switch>
      </div>
    </div>
  );
};
export default UserConfiguration;
