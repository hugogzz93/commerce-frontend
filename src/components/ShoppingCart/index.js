import { connect } from 'react-redux'
import { loadCartAction, updateCartItemAction } from '../../models/ShoppingCart'
import Pure from './pure'

const mapStateToProps = state => ({
  shoppingCart: state.shoppingCart.productItems,
  loaded: state.shoppingCart.loaded,
})
const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCartAction()),
  updateCartItem: payload => dispatch(updateCartItemAction(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
