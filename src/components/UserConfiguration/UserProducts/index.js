import { connect } from 'react-redux'
import { sendQuery, sendMutation } from '../../../lib/api'
import {
  queryUserAction,
  mutateUserAction,
} from '../../../models/User'
import gql from 'graphql-tag'
import Pure from './pure'
import '../../../style/user_configuration.sass'

const query = gql`
  query GetUserProducts($userId: ID) {
    users(query: {id: $userId}) {
      products {
        id
        name
      }
    }
  }
`
const addProducts = gql`
  mutation addProduct($userId: ID!, $productIds: [ID!]) {
    user(id: $userId) {
      addProducts(ids: $productIds)
    }
  }
`

const removeProducts = gql`
  mutation addProduct($userId: ID!, $productIds: [ID!]) {
    user(id: $userId) {
      removeProducts(ids: $productIds)
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id,
  products: state.user.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: variables => dispatch(queryUserAction({
    query,
    variables
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
