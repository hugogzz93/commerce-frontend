import { connect } from 'react-redux'
import Pure from './pure'
import { sendMutation } from '../../../lib/api'
import gql from 'graphql-tag'

const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput!) {
    product {
      create(input: $input) {
        id
        name
        price
        image
      }
    }
  }

`

const mapStateToProps = state => ({
  user_id: state.user.id
})

const mapDispatchToProps = dispatch => ({
  createProduct: variables => sendMutation({
    variables,
    mutation: CREATE_PRODUCT
  }).then(res => res.data.product.create)
    .catch(err => {
      debugger
    }),
  updateProduct: () => {}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
