import cookie from 'cookie'
import { sendQuery } from '../lib/api'
import docCookies from '../lib/docCookies'

export const getCartCookie = () =>  JSON.parse(docCookies.getItem('shopping_cart'))
export const setCartCookie = cartItems => {
  const today = new Date()
  const expires = new Date()
  expires.setTime(today.getTime() + 3600000 * 24 * 14) //14 days from now
  docCookies.setItem('shopping_cart',JSON.stringify(cartItems), expires.toGMTString(), '/', 'localhost')
}
