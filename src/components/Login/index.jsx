import {connect} from 'react-redux'
import { loginAction, checkLoggedInAction } from '../../models/Authentication'
import Pure from './pure'

const mapStateToProps = state => ({
  auth_token: state.authentication.auth_token,
  email: state.user.email
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginAction({email, password})),
  checkLoggedIn: () => dispatch(checkLoggedInAction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
