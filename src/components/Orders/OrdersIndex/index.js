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

const FETCH_ORDERS_AS_VENDOR = gql`
  query fetchOrdersAsVendor($id: ID!) {
    users(query: {id: $id}) {
      ordersAsVendor {
        id
        total
        status
        createdAt
        orderItems {
          id
          amount
          price
          product {
            id
            name
          }
        }
        client {
          name
          email
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
  fetchOrdersAsVendor: () => sendQuery({
    query: FETCH_ORDERS_AS_VENDOR,
    variables: {id: state.user.id},
  }).then(res => res.data.users[0].ordersAsVendor),
  userId: state.user.id,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
