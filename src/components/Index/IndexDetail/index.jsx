import { connect } from 'react-redux'
import { sendQuery } from '../../../lib/api'
import gql from 'graphql-tag'
import Pure from './pure'

export const GET_USER_DETAIL = gql`
  query User($id: ID) {
    users(query: {id: $id}) {
      name,
      email,
      products {
        name
      }
    }
  }
`

const mapDispatchToProps = dispatch => ({
  getUserDetails: id => sendQuery({
    query: GET_USER_DETAIL,
    variables: { id }
  }).then(res => res.data.users[0])
})

export default connect(
  state => state,
  mapDispatchToProps
)(Pure)
