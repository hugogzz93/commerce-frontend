import { connect } from 'react-redux'
import { sendQuery } from '../../../lib/api'
import gql from 'graphql-tag'
import Pure from './pure'

export const GET_USER_DETAIL = gql`
  query User($id: ID, $product_id: ID) {
    users(query: {id: $id}) {
      id
      name,
      email,
      password,
      auth_token,
      phone,
      country,
      city,
      street,
      street_2,
      street_number,
      zipcode,
      description,
      products {
        name
      }
      userProducts(query: {product_id: $product_id}) {
        id
        name
        price
        image
      }
    }
  }
`

// const mapStateToProps = state => ({
//   userProducts: state
// })
const mapDispatchToProps = dispatch => ({
  getUserDetails: variables => sendQuery({
    query: GET_USER_DETAIL,
    variables
  }).then(res => res.data.users[0])
})

export default connect(
  state => state,
  mapDispatchToProps
)(Pure)
