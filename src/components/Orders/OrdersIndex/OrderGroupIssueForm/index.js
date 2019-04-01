import Pure from "./pure";
import { sendQuery } from "../../../../lib/api";
import gql from "graphql-tag";
import { connect } from "react-redux";

const GET_ORDER_GROUP = gql`
  query getOrderGroup($id: ID!, $user_id: ID!) {
    orderGroups(ids: [$id]) {
      id
      orders {
        id
        vendor {
          id
          name
        }
        issues {
          id
          status
          newMessages(user_id: $user_id)
        }
        orderItems {
          id
          userProduct {
            id
            name
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => ({
  user_id: state.user.id,
  getOrderGroup: variables => sendQuery({ variables, query: GET_ORDER_GROUP })
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure);
