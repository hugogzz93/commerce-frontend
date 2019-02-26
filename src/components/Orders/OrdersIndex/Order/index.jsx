import Pure from './pure'
import { sendMutation } from '../../../../lib/api'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

const CHANGE_ORDER_STATUS = gql`
  mutation ChangeOrderStatus($status: OrderStatus!, $id: ID!) {
    order(id: $id) {
      updateOrder(input: {status: $status}) {
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
    mutation: CHANGE_ORDER_STATUS
  })
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)
