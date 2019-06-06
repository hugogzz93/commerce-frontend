import React from "react";
import { useReducer, useEffect } from "react";
import Input from "../Inputs/TextInput";
import TextArea from "../Inputs/TextArea";
import { formReducer, reducerTypes } from "../../lib/formReducer.js";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { AddressFragments } from "../../constants/fragments";
import iziToast from "izitoast";

const UPDATE_ADDRESS = gql`
  mutation updateAddress($id: ID!, $input: AddressInput!) {
    address(id: $id) {
      update(input: $input) {
        ...addressFields
      }
    }
  }
  ${AddressFragments.fields}
`;

const CREATE_ADDRESS = gql`
  mutation createAddress($input: AddressInput!) {
    address {
      create(input: $input) {
        ...addressFields
      }
    }
  }
  ${AddressFragments.fields}
`;

const DELETE_ADDRESS = gql`
  mutation deleteAddress($id: ID!) {
    address(id: $id) {
      destroy
    }
  }
`;

const FETCH_ADRESSES = gql`
  query fetchAddresses($userId: ID!) {
    users(query: { id: $userId }) {
      addresses {
        ...addressFields
      }
    }
  }
  ${AddressFragments.fields}
`;

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
          query: FETCH_ADRESSES,
          variables: { userId: props.userId }
        });
        const addresses = data.users[0].addresses.filter(
          a => a.id != deletedId
        );
        const updatedUser = { ...data.users[0], addresses };
        cache.writeQuery({
          query: FETCH_ADRESSES,
          variables: { userId: props.userId },
          data: {
            users: data.users.map(u =>
              u.id == updatedUser.id ? updatedUser : u
            )
          }
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
        const newAddress = address.create;
        const data = cache.readQuery({
          query: FETCH_ADRESSES,
          variables: { userId: props.userId }
        });
        const updatedUser = {
          ...data.users[0],
          addresses: data.users[0].addresses.concat(newAddress)
        };
        cache.writeQuery({
          data: {
            users: [...data.users.filter(u => u.id != updatedUser.id)].concat(
              updatedUser
            )
          },
          query: FETCH_ADRESSES,
          variables: { userId: props.userId }
        });
      }}
      onCompleted={data => {
        dispatch({ type: reducerTypes.INIT, payload: data.address });
        iziToast.success({
          title: ` Address ${props.address ? "Updated" : "Saved"}`
        });
        if (props.onCompleted) props.onCompleted();
      }}
      onError={() => iziToast.error({ title: "Error" })}
    >
      {(mutate, { data, loading, error, called }) => {
        return (
          <div className="card grid-1 row-gap-10">
            {loading && <div className="progress-bar" />}
            <Input
              label={"Country"}
              value={formState.address["country"]}
              name={"country"}
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
              label={"City"}
              value={formState.address["city"]}
              name={"city"}
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
            <div
              className="button"
              onClick={e => {
                e.preventDefault();
                const updates = formState.getUpdatedFields();
                let input = { userId: props.userId };
                if (props.address)
                  updates.forEach(c => (input[c.key] = c.value));
                else input = { ...input, ...formState.address };
                mutate({
                  variables: {
                    ...(type == TYPES.UPDATE ? { id: props.address.id } : {}),
                    input
                  }
                });
              }}
            >
              {type == TYPES.CREATION ? "Create" : "Update"}
            </div>
            {type == TYPES.UPDATE && delBtn}
          </div>
        );
      }}
    </Mutation>
  );
};

export default AddressCard;
