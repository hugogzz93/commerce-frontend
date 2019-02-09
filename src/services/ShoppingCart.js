import cookie from 'cookie'
import { sendQuery, sendMutation } from '../lib/api'
import docCookies from '../lib/docCookies'
import gql from 'graphql-tag'

export const getCartCookie = () =>  JSON.parse(docCookies.getItem('shopping_cart'))
export const setCartCookie = cartItems => {
  const today = new Date()
  const expires = new Date()
  expires.setTime(today.getTime() + 3600000 * 24 * 14) //14 days from now
  docCookies.setItem('shopping_cart',JSON.stringify(cartItems), expires.toGMTString(), '/', 'localhost')
}

const PLACE_ORDER = gql`
  mutation placeOrder($user_id: ID!, $order_items: [OrderItemInput]! ) {
    order {
      createOrder(input: {
        user_id: $user_id
        order_items: $order_items
      }) {
        id
      }
    }
  }
`

export const placeOrder = variables => sendMutation({mutation: PLACE_ORDER, variables})
