import { connect } from 'react-redux'
import { sendQuery, sendMutation } from '../../lib/api'
import gql from 'graphql-tag'
import Pure from './pure'

const GET_USER_PRODUCTS = gql`
  query getUserProducts($id: ID!) {
    users(query: {id: $id}) {
      userProducts {
        id
        stock
        name
      }
    }
  }
`

const UPDATE_USER_PRODUCT_STOCK = gql`
  mutation updateUserProductStock($id: ID!, $stock: Int!) {
    userProduct(id: $id) {
      update(input: {stock: $stock}) {
        id
        stock
      }
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id,
  getUserProducts: variables => sendQuery({
    variables,
    query: GET_USER_PRODUCTS
  }).then(res => {
    if(res.data.users[0].userProducts)
      return res.data.users[0].userProducts
    else
      throw {message: 'invalid response - inventory/index:getUserProduct'}
  }),

  updateStock: variables => sendMutation({
    variables,
    mutation: UPDATE_USER_PRODUCT_STOCK
  }).then(res => {
    if(res.data.userProduct.update)
      return res.data.userProduct.update
    else
      throw {message: 'invalid response - inventory/index:updateStock'}
  })
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Pure)
