import { connect } from 'react-redux'
import gql from 'graphql-tag';
import Pure from './pure'
import { queryProductsAction } from '../../models/Products'
import { sendQuery } from '../../lib/api'
import '../../style/search.sass'

const query = gql`
  {
    categories {
      id
      name
    }
  }
`

const mapDispatchToProps = dispatch => ({
  fetchCategories: variables => sendQuery({query, variables})
                                  .then(res => res.data.categories)
})

const mapStateToProps = () => ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)


