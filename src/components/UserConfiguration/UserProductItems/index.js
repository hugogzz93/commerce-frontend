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
  userId: state.user.id,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

