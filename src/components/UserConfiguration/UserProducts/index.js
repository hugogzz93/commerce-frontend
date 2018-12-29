import { connect } from 'react-redux'
import { sendQuery, sendMutation } from '../../../lib/api'
import { fetchUserDataAction } from '../../../models/User'
import gql from 'graphql-tag'
import Pure from './pure'

const GET_USER_PRODUCTS = gql`
  query GetUserProducts($id: ID) {
    users(userQuery: {id: $id}) {
      products {
        name
        id
        description
      }
    }
  }
`

const mapStateToProps = state => ({
  user_id: state.user.id,
  products: state.user.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: variables => dispatch(fetchUserDataAction({
    variables,
    query: GET_USER_PRODUCTS
  }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
