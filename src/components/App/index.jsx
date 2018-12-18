import { connect } from 'react-redux'
import { checkLoggedInAction } from '../../models/Authentication'
import Pure from './pure'

const mapStateToProps = state => ({
  ...state.authentication
})

const mapDispatchToProps = dispatch => ({
  checkLoggedIn: () => dispatch(checkLoggedInAction())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
