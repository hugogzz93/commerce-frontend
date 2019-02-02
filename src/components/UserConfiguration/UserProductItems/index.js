import { connect } from 'react-redux'
import { queryUserAction, mutateUserAction } from '../../../models/User'
import gql from 'graphql-tag'
import Pure from './pure'

const GET_USER_PRODUCT_ITEMS = gql`
  query getUserProductItem($user_id: ID, $product_id: ID) {
    users(query: {id: $user_id}) {
      userProducts(query: {product_id: $product_id}) {
        id
        user_id
        name
        price
        image
      }
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id,
  userProductItems: state.user.userProducts || []
})

const mapDispatchToProps = dispatch => ({
  getUserProductItems: variables => dispatch(queryUserAction({
     query: GET_USER_PRODUCT_ITEMS,
     variables
   }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

