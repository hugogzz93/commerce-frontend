import { connect } from 'react-redux'
import { sendQuery } from '../../lib/api'
import gql from 'graphql-tag'
import Pure from './pure'

const query = gql`
  query getCategoryVendors($id: ID!) {
    categories(query: {id: $id}) {
      id
      vendors {
        id
        name
        email
      }
    }
  }
`

const mapStateToDispatch = () => ({
})

const mapDispatchToProps = ( dispatch, props ) => ({
  fetchVendors: () => sendQuery({variables: {id: props.id}, query}).then(res => res.data.categories[0].vendors)
})

export default connect(
  mapStateToDispatch,
  mapDispatchToProps
)(Pure)
