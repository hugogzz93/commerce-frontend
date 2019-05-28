import React from "react";
import { useReducer, useEffect } from "react";
import Input from "../Inputs/TextInput";
import TextArea from "../Inputs/TextArea";
import { formReducer, reducerTypes } from "../../lib/formReducer.js";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { AddressFragments } from "../../constants/fragments";

const UPDATE_ADDRESS = gql`
  mutation updateAddress($id: ID!, $input: AddressInput!) {
    address(id: $id) {
      update(input: $input) {
        ...fields
      }
    }
  }
  ${AddressFragments.fields}
`;

const CREATE_ADDRESS = gql`
  mutation createAddress($input: AddressInput!) {
    address {
      create(input: $input) {
        ...fields
      }
    }
  }
  ${AddressFragments.fields}
`;

const AddressCard = props => {
  const [formState, dispatch] = useReducer(formReducer, {});
  const updatefield = payload =>
    dispatch({ type: reducerTypes.UPDATE, payload });

  useEffect(
    () => dispatch({ type: reducerTypes.INIT, payload: props.address }),
    [props.address]
  );

  return (
    <Mutation
      mutation={UPDATE_ADDRESS}
      onComplete={data =>
        dispatch({ type: reducerTypes.INIT, payload: data.address })
      }
    >
      {(updateAddress, { data, loading, error, called }) => {
        if (loading) return <div className="card">Loading</div>;
        if (error) return <div className="card">Error</div>;
        return (
          <div className="card grid-1 row-gap-10">
            <div className="card card--no-bg">
              <div className="flex--col">
                {formState.getChangedFields &&
                  formState
                    .getChangedFields()
                    .map((c, i) => <p key={c.key}>{c.key}</p>)}
              </div>
            </div>
            <Input
              label={"Country"}
              value={formState["country"]}
              name={"country"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Street"}
              value={formState["street1"]}
              name={"street1"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Street 2"}
              value={formState["street2"]}
              name={"street2"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"City"}
              value={formState["city"]}
              name={"city"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Zip"}
              value={formState["zip"]}
              name={"zip"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Phone"}
              value={formState["phone"]}
              name={"phone"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <TextArea
              label={"Instructions"}
              value={formState["instructions"]}
              name={"instructions"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <div
              className="button"
              onClick={e => {
                e.preventDefault();
                const changes = formState.getChangedFields();
                const input = {};
                changes.forEach(c => (input[c.key] = c.value));
                updateAddress({
                  variables: {
                    input,
                    id: props.address.id
                  }
                });
              }}
            />
          </div>
        );
      }}
    </Mutation>
  );
};

export default AddressCard;
