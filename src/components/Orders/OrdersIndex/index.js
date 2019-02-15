import { connect } from 'react-redux'
import { queryUserAction } from '../../../models/User'
import gql from 'graphql-tag'
import Pure from './pure'

const GET_CREATED_ORDERS = gql`
  query GetCreatedOrders($user_id: ID) {
    users(query: {id: $user_id}) {
      orders {
        createdOrders {
          id
          total
          createdAt
          status
          orderItems {
            id
            price
            amount
            status
            userProduct {
              id
              name
            }
          }
        }
      }
    }
  }
`
const GET_ATTENDING_ORDERS = gql`
  query GetCreatedOrders($user_id: ID) {
    users(query: {id: $user_id}) {
      orders {
        attendingOrders {
          id
          total
          createdAt
          status
          orderItems {
            id
            price
            amount
            status
            userProduct {
              id
              name
            }
          }
        }
      }
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id,
  createdOrders: state.user.orders.createdOrders || [],
  attendingOrders: state.user.orders.attendingOrders || []
})

const mapDispatchToProps = dispatch => ({
  getCreatedOrders: variables => dispatch(queryUserAction({
    query: GET_CREATED_ORDERS,
    variables
  })),
  getAttendingOrders: variables => dispatch(queryUserAction({
    query: GET_ATTENDING_ORDERS,
    variables
  })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
