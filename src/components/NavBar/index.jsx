import { connect } from 'react-redux'
import Pure from './pure'
import '../../style/nav.sass'

const mapStateToProps = state => ({
  ...state.authentication
})

export default connect(
  mapStateToProps
)(Pure)
