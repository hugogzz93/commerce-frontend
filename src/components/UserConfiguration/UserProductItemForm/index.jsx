import { connect } from 'react-redux'
import Pure from './pure'
import { sendMutation } from '../../../lib/api'
import gql from 'graphql-tag'
import RPC from '../../../lib/RPC.js'

const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput!) {
    product {
      create(input: $input) {
        id
        name
        price
        image
      }
    }
  }
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput!) {
    product(id: $id) {
      update(input: $input) {
        id
        name
        price
        image
      }
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id
})

const mapDispatchToProps = dispatch => ({
  createProduct: variables => RPC.sendMutation({
    variables,
    mutation: CREATE_PRODUCT,
    normalizer: res => res.data.product.create
  }),
  updateProduct: variables => RPC.sendMutation({
    variables,
    mutation: UPDATE_PRODUCT,
    normalizer: res => res.data.product.update
  })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
