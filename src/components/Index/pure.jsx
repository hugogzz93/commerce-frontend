import React, { Component, useEffect, useState } from "react";
import ThumbCard from "../cards/ThumbCard";
import IndexDetail from "./IndexDetail/index";
import Helpers from "../../lib/helpers";

const Index = props => {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState("");
  const [itemCursor, setItemCursor] = useState(0);


  let vendorThumbNails = vendors
    .filter(e => e.name.match(new RegExp(filter, "i")))
    .sort((a,b) => parseInt(a.id) - parseInt(b.id))
console.log(vendorThumbNails.map(e => e.id))
vendorThumbNails = vendorThumbNails.map(({ name, email, id }, i) => (
      <ThumbCard
        key={id}
        title={name}
        selected={itemCursor == i}
        onClick={() => {
          setItemCursor(i);
        }}
        className={"fade-in" + (itemCursor == i ? " card--highlight" : "")}
      />
    ));

  useEffect(() => {
    props.fetchVendors().then(setVendors);
  }, []);

  useEffect(() => {
    const keyHandler = Helpers.createKeyHandler({
      targets: [document.body],
      [40]: () =>
        setItemCursor((itemCursor + 1 + vendors.length) % vendors.length),
      [38]: () =>
        setItemCursor((itemCursor - 1 + vendors.length) % vendors.length)
    });

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  });

  const vendorProducts = vendors[itemCursor] ? (
    <IndexDetail id={vendors[itemCursor].id} categoryId={props.id} />
  ) : null;

  return (
    <div className="grid-12 col-gap-10 row-gap-10 container--100">
      <div className="col-3">
        <div className="s__content">
          <input
            className="s__input"
            placeholder="search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <i className="fas fa-search" />
        </div>
      </div>

      <div className="col-9" />
      <div className="col-3" style={{ borderBottom: "1px solid #e2e4ef" }} />
      <div className="col-9" style={{ borderBottom: "1px solid #e2e4ef" }} />

      <div className="col-3" style={{
        padding: '2px',
        overflowY: 'scroll',
        maxHeight: '90vh'
      }}>{vendorThumbNails}</div>

      <div className="col-9">{vendorProducts}</div>
    </div>
  );
};

export default Index;
