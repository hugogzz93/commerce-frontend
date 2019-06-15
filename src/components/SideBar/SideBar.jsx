import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SideBar = props => {
  return (
    <div id="sidebar">
      <div className="flex--col content">
        <Link className="card card--no-bg flex--row" to="/users/edit/addresses">
          <i class="fas fa-address-book" />
          <span className="show-on-hover">Addresses</span>
        </Link>
        <Link className="card card--no-bg flex--row" to="/users/edit/products">
          <i class="fas fa-box" />
          <span className="show-on-hover">Products</span>
        </Link>
        <Link className="card card--no-bg flex--row" to="/users/edit/profile">
          <i class="fas fa-box" />
          <span className="show-on-hover">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
