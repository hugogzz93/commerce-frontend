import { connect } from 'react-redux'
import { sendQuery } from '../../lib/api'
import {GET_USERS_FOR_PRODUCT} from '../../constants/schema'
import Pure from './pure'
import '../../style/index.sass'

// const reducer = (state, action) => {
//   switch(action.type) {
//     case 'setOptions':
//       return {
//         
//       }
//     case 'setShownOption':
//     case 'updateFilters':
//     case 'setCursor':
//   }
// }
// const mapStateToProps
const mapDispatchToProps = dispatch => ({
  getUsersForProduct: (product_id, filters) => sendQuery({
    query: GET_USERS_FOR_PRODUCT,
    variables: {
      product_id, 
      userName: filters.name
    }
  })
})

export default connect(
  state => state,
  mapDispatchToProps,
)(Pure)
