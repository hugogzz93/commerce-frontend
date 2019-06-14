import React, { useState, useEffect } from "react";
import numeral from "numeral";
import Errors from "../../constants/errors";
import Selectize from "react-select";
import { Query } from "react-apollo";
import { FETCH_ADDRESSES } from "../../constants/queries.js";
import { sendQuery } from "../../lib/api.js";

const ShoppingCart = props => {
  const [address, setAddress] = useState(null);
  const [canCheckout, setCanCheckout] = useState(false);
  const updateCartItemQty = (amount, id) => {
    const item = props.products.find(e => e.id == id);
    props.updateCartItem({ ...item, amount });
  };

  useEffect(() => {
    props.loadCart();
  }, [props.products.length]);
  useEffect(() => {
    if (address) setCanCheckout(true);
  }, [address]);

  const subTotal = numeral(
    props.products.reduce((sum, e) => sum + e.price * e.amount, 0)
  );

  if (!props.products.length)
    return (
      <div className="grid-1 card card--no-bg">
        <span className="t--white">Cart is Empty</span>
      </div>
    );

  const productDivs = props.products.map(item => {
    let errorDiv = null;
    if (item.stock < item.amount)
      errorDiv = (
        <span className="t--white">ERROR: Only {item.stock} available.</span>
      );
    return (
      <div className="grid-1 row-gap-10" key={item.id}>
        <div className="flex--row flex--between">
          <div className="t--strong t--white t--size-b3">{item.name}</div>
          <i
            className="fas fa-times t--grayish t--size-b3 clickable"
            onClick={() => props.removeItemFromCart({ id: item.id })}
          />
        </div>
        <div className="t--size-b3 t--grayish grid-12 flex--align-center t--align-c">
          <input
            className="in__small-num col-1"
            type="number"
            value={item.amount}
            onChange={e => updateCartItemQty(e.target.value, item.id)}
            style={{
              border: "1px solid white",
              borderRadius: "3px",
              background: "transparent",
              color: "white"
            }}
          />
          <div className="col-1">x</div>
          <div className="col-1 t--align-l">{item.price}</div>
        </div>
        {errorDiv}
      </div>
    );
  });

  return (
    <div className="grid-1 card card--no-bg">
      {productDivs}
      <div className="grid-1 row-gap-10">
        <div className="flex--row flex--between">
          <div className="t--white">Total</div>
          <div className="t--white t--strong">{subTotal.format("0,0")} MXN</div>
        </div>
        {props.unknown_error && (
          <span className="t--white">
            * An error ocurred, please try again later.
          </span>
        )}
        <Query query={FETCH_ADDRESSES} variables={{ userId: props.userId }}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
            if (data.addresses)
              return (
                <React.Fragment>
                  <div className="form_control">
                    <Selectize
                      placeholder="Select Address"
                      value={address ? address.name : null}
                      options={data.addresses.map(e => ({
                        value: e.id,
                        label: e.fullName,
                        data: e
                      }))}
                      onChange={a => setAddress(a.data)}
                      // onChange={i => {debugger; setAddress(i)}}
                    />
                  </div>
                  <div
                    className="button btn--orng-white"
                    disabled={canCheckout ? false : true}
                    onClick={() => props.checkout({ address })}
                  >
                    CHECKOUT
                  </div>
                </React.Fragment>
              );
            return <div />;
          }}
        </Query>
      </div>
    </div>
  );
};

export default ShoppingCart;
