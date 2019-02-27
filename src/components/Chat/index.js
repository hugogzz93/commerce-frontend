import { connect } from 'react-redux'
import Pure from './pure'
import io from 'socket.io-client'
import { CHAT_URL } from '../../constants/config'
import { sendQuery, sendMutation } from '../../lib/api'
import gql from 'graphql-tag'

const GET_ORDER = gql`
 query getOrder($id: ID) {
  orders(ids: [$id]) {
    id
    vendor {
      name
      id
      email
    }
    client {
      name
      id
      email
    }
    issues {
      createdAt
      id
      status
      messages {
        id
        body
        author {
          id
        }
      }
    }
  }
 }
`

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
        status
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

const CLOSE_ISSUE = gql`
  mutation CloseIssue($id: ID!) {
    issue(id: $id) {
      close {
        id
        status
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
  }),
  closeIssue: variables => sendMutation({
    variables,
    mutation: CLOSE_ISSUE
  }).then(res => res.data.issue.close.status),
  getOrder: variables => sendQuery({
    variables,
    query: GET_ORDER
  }),
})

export default connect(
  mapStateToDefault,
  mapDispatchToDefault
)(Pure)
