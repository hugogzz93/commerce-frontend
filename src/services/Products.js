import { sendQuery, sendMutation } from "../lib/api";
import gql from "graphql-tag";

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput!) {
    product {
      create(input: $input) {
        name
        id
        description
      }
    }
  }
`;

export const queryProducts = query => sendQuery(query);
export const createProduct = variables =>
  sendMutation({ variables, mutation: CREATE_PRODUCT });
