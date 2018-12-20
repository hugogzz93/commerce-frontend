import { useReducer } from 'react'
import { connect } from 'react-redux'
import Pure from './pure'

const reducer = (state, {type, payload: {field, value}}) => {
  switch(type) {
    case 'UPDATE_FIELD':
      return {
        ...state, [field]: value
      }
  }
}

const mapStateToProps = state => ({
  ...state,
  reducer,
  initialState: {
    name: state.authentication.user.name,
    email: state.authentication.user.email,
    password: '',
    password_confirmation: '',
    phone: state.authentication.user.phone,
    country: state.authentication.user.country,
    city: state.authentication.user.city,
    street: state.authentication.user.street,
    street_2: state.authentication.user.street_2,
    street_number: state.authentication.user.street_number,
    zipcode: state.authentication.user.zipcode,
    description: state.authentication.user.description
  }
})


export default connect(
  mapStateToProps
)(Pure)
