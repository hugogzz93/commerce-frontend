import { connect } from "react-redux";
import { queryUserAction, mutateUserAction } from "../../../models/User";
import {
  queryProductsAction,
  createProductAction
} from "../../../models/Products";
import { sendMutation, sendQuery } from "../../../lib/api";
import gql from "graphql-tag";
import Pure from "./pure";

const getUserProducts = gql`
  query GetUserProducts($userId: ID) {
    users(query: { id: $userId }) {
      products {
        id
      }
    }
  }
`;
const getProducts = gql`
  {
    products {
      id
      name
      description
    }
  }
`;

const addProducts = gql`
  mutation addProduct($userId: ID!, $productIds: [ID]!) {
    user(id: $userId) {
      addProducts(ids: $productIds)
    }
  }
`;

const removeProducts = gql`
  mutation removeProduct($userId: ID!, $productIds: [ID]!) {
    user(id: $userId) {
      removeProducts(ids: $productIds)
    }
  }
`;

const createCategory = gql`
  mutation createCategory($name: String!) {
    product {
      create(input: { name: $name }) {
        id
        name
      }
    }
  }
`;

const FETCH_DATA = gql`
  query fetchData($userId: ID!) {
    categories {
      id
      name
      products(query: { userId: $userId }) {
        id
        name
        price
        image
      }
    }
  }
`;

const mapStateToProps = state => ({
  userId: state.user.id,
  fetchData: () =>
    sendQuery({
      variables: { userId: state.user.id },
      query: FETCH_DATA
    }).then(res => res.data.categories)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure);
