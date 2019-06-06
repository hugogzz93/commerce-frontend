import React, { useState, useEffect } from "react";
import mergeByKey from "array-merge-by-key";
import debounce from "../../lib/debounce";

const noProductsCard = <div className="card">No Products</div>;

const Inventory = props => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedRegistry, setDebounced] = useState({});

  useEffect(() => {
    if (!props.user_id) return;
    props.fetchProducts({ id: props.user_id }).then(setProducts);
  }, [props.user_id]);

  const registerDebounced = (id, fn) => {
    if (debouncedRegistry[id]) return debouncedRegistry[id];
    const debouncedFn = debounce(fn, 300);
    setDebounced({ ...debouncedRegistry, [id]: debouncedFn });
    return debouncedFn;
  };

  const updateItemStock = ({ id, stock }) => {
    const updatedItem = { ...products.find(e => e.id == id), stock };
    setProducts(mergeByKey("id", products, [updatedItem]));
  };

  const productDivs = products
    .filter(e => e.name.match(new RegExp(filter, "i")))
    .map(product => {
      const updateItems = registerDebounced(
        product.id,
        (value, originalValue, id) =>
          props
            .updateStock({ input: { stock: parseInt(value) }, id })
            .catch(() => updateItemStock({ id, stock: originalValue }))
      );

      const onInputChange = e => {
        const originalValue = product.stock;
        const newValue = e.target.value;
        updateItemStock({ id: product.id, input: { stock: newValue } });
        updateItems(newValue, originalValue, product.id);
      };
      return (
        <div
          key={product.id}
          className="card flex--row flex--between fade-in"
          style={{ padding: "1.5em" }}
        >
          <span>{product.name}</span>
          <div>
            <span>Stock</span>
            <input
              style={{
                width: "3em",
                textAlign: "center",
                margin: "0 0 0 10px",
                fontSize: "inherit"
              }}
              className="in__small-num"
              type="number"
              data-id={product.id}
              value={product.stock}
              onChange={onInputChange}
            />
          </div>
        </div>
      );
    });

  return (
    <div className="container--90 grid-1 row-gap-20">
      <div className="s__content">
        <input
          className="s__input"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <i className="fas fa-search" />
      </div>
      <div>{products.length ? productDivs : noProductsCard}</div>
    </div>
  );
};

export default Inventory;
