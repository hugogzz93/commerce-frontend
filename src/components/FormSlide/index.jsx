import { connect } from 'react-redux'
import { sendMutation } from '../../lib/api'
import { updateUserAction } from '../../models/User'
import Pure from './pure'

const fieldValidator = (state, {field, value}) => {
  switch(field) {
    case 'password_confirmation': 
      return state.password != value ? "Password Confirmation doesn't match password" : null
    default:
      return null
  }
}

const formReducer = (state, {type, payload}) => {
  switch(type) {
    case 'UPDATE_FIELD':
      const field_error = fieldValidator(state, payload)
      return {
        ...state,
        [payload.field]: payload.value,
        [`${payload.field}_error`]: field_error

      }
  }
}

const mapStateToProps = state => ({
  id: state.user.id,
  initialFormState: {
    name: state.user.name,
    email: state.user.email,
    password: '',
    password_confirmation: '',
    phone: state.user.phone,
    country: state.user.country,
    city: state.user.city,
    street: state.user.street,
    street_2: state.user.street_2,
    street_number: state.user.street_number,
    zipcode: state.user.zipcode,
    description: state.user.description
  },

})

const mapDispatchToProps = dispatch => ({
  submitUpdates: payload => dispatch(updateUserAction(payload)),
  formReducer: formReducer
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)