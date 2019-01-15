import { connect } from 'react-redux'
import { logoutAction } from '../../models/Authentication'
import Pure from './pure'
import '../../style/nav.sass'

const mapStateToProps = state => ({
  loggedIn: !!state.authentication.auth_token,
  email: state.user.email
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
