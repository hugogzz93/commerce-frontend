import Pure from './pure'
import { connect } from 'react-redux'
import { sendQuery }  from '../../../lib/api'
import gql from 'graphql-tag'

const ORDER_QUERY = gql`
  query getOrder($id: ID) {
    orders(query: {id: $id}) {
      orderItems {
        amount
        userProduct {
          name
          user {
            name
            email
            id
          }
        }
      }
      issues {
        createdAt
        messages {
          author_id
          body
        }
      }
    }
  }

`

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => ({
  getOrder: order_id => sendQuery(ORDER_QUERY)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
