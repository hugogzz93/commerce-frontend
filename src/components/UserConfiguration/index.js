import { connect } from 'react-redux'
import Pure from "./pure";

const mapStateToProps = state => ( {
  userId: state.user.id
} )

export default connect(mapStateToProps)(Pure);
