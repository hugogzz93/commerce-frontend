import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { queryProductsAction } from '../../models/Products'
import Pure from './pure'
import '../../style/index.sass'

const query = gql`
  query GetProductUsers($productId: ID!, $userName: String ) {
    products(query: { id: $productId }) {
      id
      users(query: { name: $userName }) {
        name
        email
        id
        country
        city
        zipcode
      }
    }
  }
`

const mapStateToDispatch = (state, {productId}) => ({
  product: state.products[productId]
})

const mapDispatchToProps = dispatch => ({
  getProductUsers: variables => dispatch(queryProductsAction({ query, variables }))
})

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(Pure)
