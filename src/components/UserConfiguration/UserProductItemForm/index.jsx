import { connect } from 'react-redux'
import Pure from './pure'
import { mutateUserAction } from '../../../models/User'
import gql from 'graphql-tag'

const ADD_USER_PRODUCT_ITEM = gql`
  mutation AddProductItem( $user_id: ID, $product_id: ID $name: String, $price: Float, $image: Upload) {
    user(id: $user_id) {
      createUserProduct(input: {
                            user_id: $user_id,
                            product_id: $product_id,
                            name: $name,
                            price: $price,
                            image: $image
                          }
                        )
        {
          id, user_id, product_id, name, price, image
        }
    }
  }
`
const UPDATE_USER_PRODUCT_ITEM = gql`
  mutation UpdateProductItem( $user_id: ID, $product_id: ID, $name: String, $price: Float, $image: Upload, $id: ID) {
    user(id: $user_id) {
      updateUserProduct(input: {
                            id: $id,
                            user_id: $user_id,
                            product_id: $product_id,
                            name: $name,
                            price: $price,
                            image: $image
                          }
                        )
        {
          id, user_id, product_id, name, price, image
        }
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id
})

const mapDispatchToProps = dispatch => ({
  createProductItem: variables => dispatch(mutateUserAction({
    mutation: ADD_USER_PRODUCT_ITEM,
    variables
  })),
  updateProductItem: variables => dispatch(mutateUserAction({
    mutation: UPDATE_USER_PRODUCT_ITEM,
    variables
  }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
