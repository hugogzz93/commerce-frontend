import { connect } from "react-redux";
import { sendQuery, sendMutation } from "../../lib/api";
import gql from "graphql-tag";
import Pure from "./pure";

const FETCH_PRODUCTS = gql`
  query fetchProducts($id: ID!) {
    users(query: { id: $id }) {
      id
      products {
        id
        name
        stock
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput!) {
    product(id: $id) {
      update(input: $input) {
        stock
      }
    }
  }
`;

const mapStateToProps = state => ({
  user_id: state.user.id,
  fetchProducts: variables =>
    sendQuery({
      variables,
      query: FETCH_PRODUCTS
    }).then(res => {
      if (res.data.users[0].products) return res.data.users[0].products;
      else
        throw { message: "invalid response - inventory/index:fetchproducts" };
    }),

  updateStock: variables =>
    sendMutation({
      variables,
      mutation: UPDATE_PRODUCT
    }).then(res => {
      if (res.data.userProduct.update) return res.data.product.update;
      else throw { message: "invalid response - inventory/index:updateStock" };
    })
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure);
