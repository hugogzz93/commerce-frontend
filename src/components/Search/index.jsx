import { connect } from 'react-redux'
import gql from 'graphql-tag';
import Pure from './pure'
import { GET_PRODUCTS } from '../../constants/schema'
import { queryProductsAction } from '../../models/Products'

import '../../style/search.sass'
import '../../style/transitions/indexTransition.sass';

const query = gql`
  query GetProducts($name: String) {
    products(query: {name: $name}) {
      id
      name
    }
  }
`

const mapDispatchToProps = dispatch => ({
  getProducts: variables => dispatch(queryProductsAction({query, variables})),
})

const mapStateToProps = ( {products} ) => ({
  searchOptions: Object.keys(products).map(key => products[key]) || []
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)


