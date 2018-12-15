import { createReducer } from 'redux-act';
import * as actions from '../actions';

const DefaultState = {
  name: '',
  email:'',
  auth_token: null
}

export default createReducer({
  [actions.updateSession]: (state, {name, email, auth_token}) => {
    return { ...state, name, email, auth_token}
  }
}, DefaultState)
