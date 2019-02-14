import { connect } from 'react-redux'
import { logoutAction } from '../../models/Authentication'
import { ROOT_URL } from '../../constants/config'
import { updateCartItemAction  } from '../../models/ShoppingCart'
import { sendQuery } from '../../lib/api'
import gql from 'graphql-tag'
import Pure from './pure'
import '../../style/nav.sass'

const GET_USER_PRODUCT_ITEMS = gql`
  query getUserProductItems($ids: [ID]!) {
    userProducts(ids: $ids) {
      id
      user_id
      name
      price
    }
  }
`


const mapStateToProps = state => ({
  loggedIn: !!state.authentication.auth_token,
  email: state.user.email,
  shoppingCart: state.shoppingCart.productItems
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    window.location = ROOT_URL + ':3000'
    dispatch(logoutAction())
  },
  getUserProducts: payload => sendQuery({
    query: GET_USER_PRODUCT_ITEMS,
    variables: payload
  }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
