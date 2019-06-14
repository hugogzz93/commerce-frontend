import gql from "graphql-tag";
import * as Fragments from "./fragments.js";

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CategoryInput!) {
    category {
      create(input: $input) {
        ...categoryFields
        products {
          id
        }
      }
    }
  }
  ${Fragments.CategoryFragments.fields}
`;
export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      ...categoryFields
      products {
        id
      }
    }
  }
  ${Fragments.CategoryFragments.fields}
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UserInput!) {
    user(id: $id) {
      update(input: $input) {
        ...userFields
      }
    }
  }
  ${Fragments.UserFragments.fields}
`;

export const FETCH_ADDRESSES = gql`
  query fetchAddresses($userId: ID!) {
    addresses(query: { userId: $userId }) {
      ...addressFields
    }
  }
  ${Fragments.AddressFragments.fields}
`;

export const UPDATE_ADDRESS = gql`
  mutation updateAddress($id: ID!, $input: AddressInput!) {
    address(id: $id) {
      update(input: $input) {
        ...addressFields
      }
    }
  }
  ${Fragments.AddressFragments.fields}
`;

export const CREATE_ADDRESS = gql`
  mutation createAddress($input: AddressInput!) {
    address {
      create(input: $input) {
        ...addressFields
      }
    }
  }
  ${Fragments.AddressFragments.fields}
`;

export const DELETE_ADDRESS = gql`
  mutation deleteAddress($id: ID!) {
    address(id: $id) {
      destroy
    }
  }
`;

export const MAKE_DD_ADDRESS = gql`
  mutation makeDdAddress($id: ID!) {
    address(id: $id) {
      update(input: { isDefaultDeliveryAddress: true }) {
        ...addressFields
      }
    }
  }
  ${Fragments.AddressFragments.fields}
`;
