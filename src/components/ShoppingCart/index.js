import { connect } from 'react-redux'
import { loadCartAction, updateCartItemAction, cartRemoveProductAction, checkoutAction } from '../../models/ShoppingCart'
import Pure from './pure'

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart.productItems,
  loaded: state.shoppingCart.loaded,
  unknown_error: state.shoppingCart.unknown_error,
  error: state.shoppingCart.error
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
