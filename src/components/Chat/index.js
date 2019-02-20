import { connect } from 'react-redux'
import Pure from './pure'
import io from 'socket.io-client'
import { CHAT_URL } from '../../constants/config'
import { sendQuery, sendMutation } from '../../lib/api'
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

const OPEN_ISSUE = gql`
  mutation openIssue($order_id: ID!, $issueInput: IssueInput!) {
    order(id: $order_id) {
      createIssue(input: $issueInput) {
        id
        messages {
          id
          author {
            name
            email
            id
          }
          body
        }
      }
    }
  }
`


const socket = io(CHAT_URL)

const mapStateToDefault = state => ({
  user: state.user,
  socket,
})

const mapDispatchToDefault = ( dispatch, props ) => ({
  getMessages: variables => sendQuery({
    variables,
    query: GET_MESSAGES
  }),
  openIssue: variables => sendMutation({
    variables,
    mutation: OPEN_ISSUE
  })

})

export default connect(
  mapStateToDefault,
  mapDispatchToDefault
)(Pure)
