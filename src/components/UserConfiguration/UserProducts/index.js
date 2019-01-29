import { connect } from 'react-redux'
import { queryUserAction, mutateUserAction, } from '../../../models/User'
import { queryProductsAction } from '../../../models/Products'
import gql from 'graphql-tag'
import Pure from './pure'
import '../../../style/user_configuration.sass'

const getUserProducts = gql`
  query GetUserProducts($userId: ID) {
    users(query: {id: $userId}) {
      products {
        id
      }
    }
  }
`
const getProducts = gql`
  {
    products {
      id
      name
      description
    }
  }
`

const addProducts = gql`
  mutation addProduct($userId: ID!, $productIds: [ID]!) {
    user(id: $userId) {
      addProducts(ids: $productIds)
    }
  }
`

const removeProducts = gql`
  mutation addProduct($userId: ID!, $productIds: [ID]!) {
    user(id: $userId) {
      removeProducts(ids: $productIds)
    }
  }
`

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    products: Object.keys(state.products).filter(p => !state.user.products.includes(p)).map(key => state.products[key]),
    userProducts: state.user.products.map(up => state.products[up])
  }
}

const mapDispatchToProps = dispatch => ({
  getUserProducts: variables => dispatch(queryUserAction({
    query: getUserProducts,
    variables
  })),
  getProducts: () => dispatch(queryProductsAction({
    query: getProducts
  })),
  addProducts: variables => dispatch(mutateUserAction({
    variables,
    mutation: addProducts
  })),
  removeProducts: variables => dispatch(mutateUserAction({
    variables,
    mutation: removeProducts
  }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
