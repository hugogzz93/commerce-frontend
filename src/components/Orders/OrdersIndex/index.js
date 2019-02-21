import { connect } from 'react-redux'
import { queryUserAction } from '../../../models/User'
import gql from 'graphql-tag'
import Pure from './pure'

const GET_CREATED_ORDERS = gql`
  query GetCreatedOrders($user_id: ID!) {
    users(query: {id: $user_id}) {
      orders {
        orderGroups {
          id
          total
          createdAt
          orders {
            id
            createdAt
            total
            vendor {
              id
              name
              email
            }
            issues {
              id
              status
            }
            orderItems {
              id
              amount
              price
              userProduct {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

const GET_ATTENDING_ORDERS = gql`
  query GetAttendingOrders($user_id: ID!) {
    users(query: {id: $user_id}) {
      orders {
        ordersAsVendor {
          id
          status
          total
          createdAt
          issues {
            id
            status
          }
          orderItems {
            id
            amount
            price
            userProduct {
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
  orderGroups: state.user.orders.orderGroups || [],
  attendingOrders: state.user.orders.ordersAsVendor || [],
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
