import React, { useState, useEffect } from "react";
import { createProductAction } from "../../../models/Products";
import Input from "../../Inputs/TextInput";
import TextArea from "../../Inputs/TextArea";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../../../constants/queries.js";

const ProductForm = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.onActiveChange) props.onActiveChange(active);
  }, [active]);

  const createProduct = () => {
    setName("");
    setDescription("");
    setActive(false);
    props.createProduct({ input: { name, description } });
  };

  if (active)
    return (
      <Mutation
        mutation={CREATE_CATEGORY}
        update={(
          cache,
          {
            data: {
              category: { create }
            }
          }
        ) => {
          const {categories} = cache.readQuery({ query: GET_CATEGORIES });
          cache.writeQuery({
            query: GET_CATEGORIES,
            data: {categories: [create, ...categories]}
          });
        }}
      >
        {(createCategory, { data, loading, error }) => {
          return (
            <form
              className="grid-5 row-gap-5"
              onSubmit={e => {
                e.preventDefault();
                createCategory({
                  variables: { input: { name, description } }
                });
              }}
            >
              <div className="col-5">
                <Input
                  label={"Name"}
                  value={name}
                  name={'name'}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="col-5">
                <TextArea
                  label={"Description"}
                  value={description}
                  name={'description'}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="col-3" />
              <div
                className="button col-1 btn--danger"
                onClick={() => setActive(false)}
              >
                Cancel
              </div>
              <button className="button col-1" type="submit">
                Create
              </button>
            </form>
          );
        }}
      </Mutation>
    );
  else
    return (
      <div className="card card--clickable" onClick={() => setActive(true)}>
        Create Category
      </div>
    );
};

const mapDispatchToProps = dispatch => ({
  createProduct: e => dispatch(createProductAction(e))
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(ProductForm);
