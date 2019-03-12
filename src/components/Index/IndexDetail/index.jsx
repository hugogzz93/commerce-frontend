import { connect } from 'react-redux'
import { sendQuery } from '../../../lib/api'
import { cartAddProductAction } from '../../../models/ShoppingCart'
import gql from 'graphql-tag'
import Pure from './pure'

export const GET_VENDOR_DETAIL = gql`
  query User($id: ID, $categoryId: ID) {
    users(query: {id: $id}) {
      id
      name,
      email,
      products(query: {categoryId: $categoryId}) {
        id
        userId
        name
        price
      }
    }
  }
`

const mapDispatchToProps = dispatch => ({
  getVendorDetails: variables => sendQuery({
    query: GET_VENDOR_DETAIL,
    variables
  }).then(res => res.data.users[0]),
  addProductItem: payload => dispatch(cartAddProductAction(payload))
})

export default connect(
  state => state,
  mapDispatchToProps
)(Pure)
