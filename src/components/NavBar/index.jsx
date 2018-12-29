import { connect } from 'react-redux'
import Pure from './pure'
import '../../style/nav.sass'

const mapStateToProps = state => ({
  loggedIn: !!state.authentication.auth_token,
  email: state.user.email
})

export default connect(
  mapStateToProps
)(Pure)
