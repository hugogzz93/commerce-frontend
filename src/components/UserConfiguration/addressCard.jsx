import React from "react";
import { useReducer, useEffect } from "react";
import Input from "../Inputs/TextInput";
import TextArea from "../Inputs/TextArea";
import { formReducer, reducerTypes } from "../../lib/formReducer.js";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { AddressFragments } from "../../constants/fragments";
import {
  FETCH_ADDRESSES,
  UPDATE_ADDRESS,
  CREATE_ADDRESS,
  DELETE_ADDRESS
} from "../../constants/queries.js";
import iziToast from "izitoast";

const TYPES = {
  CREATION: 0,
  UPDATE: 2
};

const AddressCard = props => {
  const [formState, dispatch] = useReducer(formReducer, {
    address: props.address || {}
  });
  const updatefield = payload =>
    dispatch({ type: reducerTypes.UPDATE, payload });

  useEffect(
    () => dispatch({ type: reducerTypes.INIT, payload: props.address || {} }),
    [props.address]
  );

  const type =
    formState.address && formState.address.id ? TYPES.UPDATE : TYPES.CREATION;
  const mutation = type == TYPES.UPDATE ? UPDATE_ADDRESS : CREATE_ADDRESS;

  const delBtn = (
    <Mutation
      mutation={DELETE_ADDRESS}
      update={(cache, { data: { address } }) => {
        const deletedId = address.destroy;
        const data = cache.readQuery({
          query: FETCH_ADDRESSES,
          variables: { userId: props.userId }
        });
        const addresses = data.addresses.filter( a => a.id != deletedId);
        cache.writeQuery({
          query: FETCH_ADDRESSES,
          variables: { userId: props.userId },
          data: { addresses }
        });
      }}
    >
      {(delAddress, { data, loading, error }) => (
        <div
          className="button btn--danger"
          onClick={() =>
            delAddress({ variables: { id: formState.address.id } })
          }
        >
          Delete
        </div>
      )}
    </Mutation>
  );

  return (
    <Mutation
      mutation={mutation}
      update={(cache, { data: { address } }) => {
        const newAddress =
          type == TYPES.CREATION ? address.create : address.update;

        const data = cache.readQuery({
          query: FETCH_ADDRESSES,
          variables: { userId: props.userId }
        });

        const addresses = [ ...data.addresses.filter(a => a.id != newAddress.id), newAddress]
        cache.writeQuery({
          data: { addresses },
          query: FETCH_ADDRESSES,
          variables: { userId: props.userId }
        });
      }}
      onCompleted={data => {
        if (props.onCompleted) props.onCompleted();
        if (type == TYPES.CREATION) return;
        dispatch({ type: reducerTypes.INIT, payload: data.address.update });
        iziToast.success({
          title: ` Address ${props.address ? "Updated" : "Saved"}`
        });
      }}
      onError={() => iziToast.error({ title: "Error" })}
    >
      {(mutate, { data, loading, error, called }) => {
        return (
          <form
            className="card grid-1 row-gap-10"
            onSubmit={e => {
              e.preventDefault();
              const updates = formState.getUpdatedFields();
              let input = { userId: props.userId };
              if (props.address) updates.forEach(c => (input[c.key] = c.value));
              else input = { ...input, ...formState.address };
              mutate({
                variables: {
                  ...(type == TYPES.UPDATE ? { id: props.address.id } : {}),
                  input
                }
              });
            }}
          >
            {loading && <div className="progress-bar" />}
            <Input
              label={"Name"}
              value={formState.address["fullName"]}
              name={"fullName"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Country"}
              value={formState.address["country"]}
              name={"country"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"City"}
              value={formState.address["city"]}
              name={"city"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Street"}
              value={formState.address["street1"]}
              name={"street1"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Street 2"}
              value={formState.address["street2"]}
              name={"street2"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Zip"}
              value={formState.address["zip"]}
              name={"zip"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <Input
              label={"Phone"}
              value={formState.address["phone"]}
              name={"phone"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <TextArea
              label={"Instructions"}
              value={formState.address["instructions"]}
              name={"instructions"}
              onChange={({ target: { name, value } }) => {
                updatefield({ field: name, value });
              }}
            />
            <button className="button" type="submit">
              {type == TYPES.CREATION ? "Create" : "Update"}
            </button>
            {type == TYPES.UPDATE && delBtn}
          </form>
        );
      }}
    </Mutation>
  );
};

export default AddressCard;
