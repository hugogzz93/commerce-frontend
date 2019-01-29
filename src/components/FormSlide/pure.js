import React from 'react'
import { useReducer, useEffect } from 'react'
import Input from '../Inputs/TextInput'
import TextArea from '../Inputs/TextArea'
import '../../style/formslide.sass'

const FormSlide = props => {
  const [formState, dispatch] = useReducer(props.formReducer, props.initialFormState)

  const updatesAreValid = () => {
    return true
  }

  const handleFieldChange = e => {
    dispatch({ 
      type: 'UPDATE_FIELD',
      payload: {
        field: e.target.name,
        value: e.target.value
      }
   })
  }

  const onSubmit = () => {
    if(updatesAreValid()) props.submitUpdates({ id: props.id, ...formState })
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_REDUCER',
      payload: props.initialFormState
    })
  }, [props.initialFormState])

  return (
    <div className="form-slide grid-12 col-gap-10 container--50">
      <Input label={'Name'} className={'col-6'}
        value={formState.name} name={'name'}
        onChange={handleFieldChange}/>
      <Input label={'Email'} className={'col-6'}
        value={formState.email} name={'email'}
        onChange={handleFieldChange}/>
      <Input label={'Password'} type={'password'}
        className={'col-6'} value={formState.password}
        name={'password'} onChange={handleFieldChange}/>
      <Input label={'Password Confirmation'} type={'password'}
        className={'col-6'} value={formState.password_confirmation}
        name={'password_confirmation'} onChange={handleFieldChange}
        errors={formState.password_confirmation_error}
      />
      <Input label={'Telephone'}  className={'col-6'}
        value={formState.phone} name={'phone'}
        onChange={handleFieldChange}/>
      <Input label={'Country'}  className={'col-3'}
        value={formState.country} name={'country'}
        onChange={handleFieldChange}/>
      <Input label={'City'}  className={'col-3'}
        value={formState.city} name={'city'}
        onChange={handleFieldChange}/>
      <Input label={'ZipCode'}  className={'col-3'}
        value={formState.zipcode} name={'zipcode'}
        onChange={handleFieldChange}/>
      <Input label={'Street'}  className={'col-3'}
        value={formState.street} name={'street'}
        onChange={handleFieldChange}/>
      <Input label={'Street 2'}  className={'col-3'}
        value={formState.street_2} name={'street_2'}
        onChange={handleFieldChange}/>
      <Input label={'Street Number'}  className={'col-3'}
        value={formState.street_number} name={'street_number'}
        onChange={handleFieldChange}/>
     <TextArea label={'Description'}  className={'col-12'}
        value={formState.description} name={'description'}
        onChange={handleFieldChange}/>
     <div className="button col-3" disabled={!updatesAreValid()} onClick={onSubmit}>Submit</div>
    </div>
  )
}

export default FormSlide
