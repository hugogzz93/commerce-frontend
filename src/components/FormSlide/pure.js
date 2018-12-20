import React from 'react'
import { useReducer } from 'react'
import Input from './input'
import TextArea from './textarea'
import '../../style/formslide.sass'

const FormSlide = props => {
  const [state, dispatch] =  useReducer(props.reducer, props.initialState)

  const handleFieldChange = e => {
    dispatch({ 
      type: 'UPDATE_FIELD',
      payload: {
        field: e.target.name,
        value: e.target.value
      }
   })
  }

  return (
    <div className="form-slide grid-12">
      <Input label={'Name'} className={'col-6'}
        value={state.name} name={'name'}
        onChange={handleFieldChange}/>
      <Input label={'Email'} className={'col-6'}
        value={state.email} name={'email'}
        onChange={handleFieldChange}/>
      <Input label={'Password'} type={'password'}
        className={'col-6'} value={state.password}
        name={'password'} onChange={handleFieldChange}/>
      <Input label={'Password Confirmation'} type={'password'}
        className={'col-6'} value={state.password_confirmation}
        name={'password_confirmation'} onChange={handleFieldChange}/>
      <Input label={'Telephone'}  className={'col-6'}
        value={state.country} name={'country'}
        onChange={handleFieldChange}/>
      <Input label={'Country'}  className={'col-3'}
        value={state.country} name={'country'}
        onChange={handleFieldChange}/>
      <Input label={'City'}  className={'col-3'}
        value={state.city} name={'city'}
        onChange={handleFieldChange}/>
      <Input label={'ZipCode'}  className={'col-3'}
        value={state.zipcode} name={'zipcode'}
        onChange={handleFieldChange}/>
      <Input label={'Street'}  className={'col-3'}
        value={state.street} name={'street'}
        onChange={handleFieldChange}/>
      <Input label={'Street 2'}  className={'col-3'}
        value={state.street_2} name={'street_2'}
        onChange={handleFieldChange}/>
      <Input label={'Street Number'}  className={'col-3'}
        value={state.street_number} name={'street_number'}
        onChange={handleFieldChange}/>
     <TextArea label={'Description'}  className={'col-12'}
        value={state.description} name={'description'}
        onChange={handleFieldChange}/>
    </div>
  )
}

export default FormSlide
