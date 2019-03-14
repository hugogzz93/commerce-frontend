import { connect } from 'react-redux'
import { sendQuery } from '../../../lib/api'
import gql from 'graphql-tag'
import Pure from './pure'

const FETCH_ORDER_GROUPS = gql`
  query fetchOrderGroups($id: ID!) {
    users(query: {id: $id}) {
      orderGroups {
        id
        total
        createdAt
        status
        orders {
          id
          status
          orderItems {
            id
            amount
            price
            product {
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
  query GetAttendingOrders($user_id: ID!) {
    users(query: {id: $user_id}) {
      orders {
        ordersAsVendor {
          id
          status
          total
          createdAt
          client {
            id
            name
            email
            phone
            city
            country
            street
            street_2
            zipcode
          }
          issues {
            id
            status
            newMessages(user_id: $user_id)
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
`

const mapStateToProps = state => ({
  fetchOrderGroups: () => sendQuery({
    query: FETCH_ORDER_GROUPS,
    variables: {id: state.user.id}
  }).then(res => res.data.users[0].orderGroups),
  userId: state.user.id,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
