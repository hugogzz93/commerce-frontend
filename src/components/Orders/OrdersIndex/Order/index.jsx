import Pure from './pure'
import { sendMutation } from '../../../../lib/api'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($status: OrderStatus!, $id: ID!) {
    order(id: $id) {
      update(input: {status: $status}) {
        id
        status
      }
    }
  }
`

const mapStateToProps = ( state, props ) => ({
  user_id: state.user.id,
  updateStatus: status => sendMutation({
    variables: {id: props.order.id, status},
    mutation: UPDATE_ORDER_STATUS
  }).then(r => r.data.order.update.status)
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
