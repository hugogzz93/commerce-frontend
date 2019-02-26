import { connect } from 'react-redux'
import { loadCartAction, updateCartItemAction, cartRemoveProductAction, checkoutAction } from '../../models/ShoppingCart'
import Pure from './pure'

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart.productItems,
  loaded: state.shoppingCart.loaded,
  checkout_failed: state.shoppingCart.checkout_fail,
})
const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCartAction()),
  updateCartItem: payload => dispatch(updateCartItemAction(payload)),
  removeItemFromCart: payload => dispatch(cartRemoveProductAction(payload)),
  checkout: () => dispatch(checkoutAction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
