import { connect } from 'react-redux'
import Pure from './pure'
import io from 'socket.io-client'
import { CHAT_URL } from '../../constants/config'
import { sendQuery } from '../../lib/api'
import gql from 'graphql-tag'

const GET_MESSAGES = gql`
  query getMessages($issue_id: ID!) {
    issues(ids: [$issue_id]) {
      status
      messages {
        id
        body
        author {
          id
          name
        }
      }
    }
  }
`

const socket = io(CHAT_URL)

const mapStateToDefault = state => ({
  user: state.user,
  socket,
  issue_id: 52,
})

const mapDispatchToDefault = dispatch => ({
  getMessages: variables => sendQuery({
    variables,
    query: GET_MESSAGES
  })

})

export default connect(
  mapStateToDefault,
  mapDispatchToDefault
)(Pure)
