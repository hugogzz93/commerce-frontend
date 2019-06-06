import { connect } from "react-redux";
import { logoutAction } from "../../models/Authentication";
import { ROOT_URL } from "../../constants/config";
import Pure from "./pure";
import "../../style/nav.sass";

const mapStateToProps = state => ({
  loggedIn: !!state.authentication.auth_token,
  email: state.user.email
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    window.location = ROOT_URL + ":3000";
    dispatch(logoutAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure);
