import { connect } from "react-redux";
import {
  loadCartAction,
  updateCartItemAction,
  cartRemoveProductAction,
  checkoutAction
} from "../../models/ShoppingCart";
import Pure from "./pure";

const mapStateToProps = state => ({
  userId: state.user.id,
  products: state.shoppingCart.products,
  loaded: state.shoppingCart.loaded,
  unknown_error: state.shoppingCart.unknown_error,
  error: state.shoppingCart.error
});

const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCartAction()),
  updateCartItem: payload => dispatch(updateCartItemAction(payload)),
  removeItemFromCart: payload => dispatch(cartRemoveProductAction(payload)),
  checkout: variables => dispatch(checkoutAction(variables))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure);
