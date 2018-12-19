import { connect } from 'react-redux'
import gql from 'graphql-tag';
import Pure from './pure'
import { GET_PRODUCTS } from '../../constants/schema'
import { sendQuery } from '../../lib/api'

import '../../style/search.sass'
import '../../style/transitions/indexTransition.sass';

const mapDispatchToProps = dispatch => ({
  getProducts: (variables) => sendQuery({
    query: GET_PRODUCTS,
    variables
  }),
})

export default connect(
  state => state,
  mapDispatchToProps
)(Pure)


