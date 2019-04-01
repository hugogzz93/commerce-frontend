import React, { useEffect, useState } from "react";
import { generateContext } from "../../StateProvider";
import ThumbCard from "../../cards/ThumbCard";
import UserProductItems from "../UserProductItems";
import NewProductForm from "./productForm";
import mergeByKey from "array-merge-by-key";

const initialState = {
  categories: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setCategories":
      return {
        ...state,
        categories: action.payload
      };
    case "updateProduct": {
      let updatedCategory = {
        ...state.categories.find(e => e.id == action.payload.categoryId)
      };
      let updatedProduct = {
        ...updatedCategory.products.find(e => e.id == action.payload.product.id)
      };
      updatedProduct = { ...updatedProduct, ...action.payload.product };
      updatedCategory = {
        ...updatedCategory,
        products: mergeByKey("id", updatedCategory.products, [updatedProduct])
      };
      return {
        ...state,
        categories: mergeByKey("id", state.categories, [updatedCategory])
      };
    }
    case "addProduct": {
      const updatedCategory = state.categories.find(
        e => e.id == action.payload.categoryId
      );
      const products = [...updatedCategory.products, action.payload.product];
      return {
        ...state,
        categories: mergeByKey("id", state.categories, [
          { ...updatedCategory, products }
        ])
      };
    }
    case "deleteProduct": {
      return {
        ...state,
        categories: state.categories.map(cat => {
          if (cat.id == action.payload.categoryId)
            return {
              ...cat,
              products: cat.products.filter(
                p => p.id != action.payload.productId
              )
            };
        })
      };
    }
    default:
      return state;
  }
};

const [ProductContext, useProductContext] = generateContext();
export { ProductContext, useProductContext };

const UserProducts = props => (
  <ProductContext initialState={initialState} reducer={reducer}>
    <Products {...props} />
  </ProductContext>
);

const Products = props => {
  const [state, dispatch] = useProductContext();
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCategory, selectCategory] = useState(null);
  const [catFormActive, setCatFormState] = useState(false);

  useEffect(() => {
    if (!props.userId) return;
    props.fetchData().then(categories =>
      dispatch({
        type: "setCategories",
        payload: categories
      })
    );
  }, [props.userId]);

  useEffect(() => {
    if (state.categories.length && !selectedCategory)
      selectCategory(state.categories[0].id);
  }, [state.categories]);

  const createCategory = () => {};
  // const createCategory = () => (
  //   props.createCategory(searchFilter)
  // )

  const searchItemDivs = state.categories
    .filter(
      p =>
        (searchFilter.length &&
          p.name.toLowerCase().includes(searchFilter.toLowerCase())) ||
        !searchFilter.length
    )
    .sort((a, b) => b.products.length - a.products.length)
    .map((category, i) => (
      <ThumbCard
        key={i}
        title={category.name}
        subtitle={(() => {
          const num = category.products.length;
          if (num == 0) return "";
          if (num > 1) return num + " products";
          return "1 product";
        })()}
        onClick={() => selectCategory(category.id)}
        className={`fade-in ${
          selectedCategory == category ? "card--highlight" : ""
        }`}
      />
    ));

  const colBaseSize = catFormActive ? 12 : 3;

  return (
    <div className="grid-12 container--90 col-gap-10 row-gap-20">
      <div className={`s__content flex--col col-${colBaseSize}`}>
        <input
          className="s__input"
          autoComplete="false"
          type="text"
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
        />
        <i className="fas fa-search" />
      </div>
      <div className={`col-${12 - colBaseSize}`} />
      <div
        className={`flex--col col-${colBaseSize}`}
        style={{
          overflowY: "scroll",
          padding: "1px",
          maxHeight: "120vh"
        }}
      >
        <NewProductForm onActiveChange={setCatFormState} />
        <div className="tail" style={{ marginBottom: "10px" }} />
        {/* // { selectedItemDivs} */}
        <div className="tail" style={{ marginBottom: "10px" }} />
        {searchItemDivs}
      </div>
      {!catFormActive && (
        <div className={`col-9 flex__row`}>
          {selectedCategory && (
            <UserProductItems categoryId={selectedCategory} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserProducts;
