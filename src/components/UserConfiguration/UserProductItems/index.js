import { connect } from 'react-redux'
import { queryUserAction, mutateUserAction } from '../../../models/User'
import gql from 'graphql-tag'
import Pure from './pure'
import RPC from '../../../lib/RPC.js'

const GET_USER_PRODUCT_ITEMS = gql`
  query getUserProductItem($user_id: ID, $product_id: ID) {
    users(query: {id: $user_id}) {
      userProducts(query: {product_id: $product_id}) {
        id
        user_id
        name
        price
        image
      }
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    product(id: $id) {
      destroy
    }
  }
`

const mapStateToProps = state => ({
  userId: state.user.id,
  deleteProduct: variables => RPC.sendMutation({
    variables,
    mutation: DELETE_PRODUCT,
    normalizer: res => res.data.product.destroy
  })

})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

