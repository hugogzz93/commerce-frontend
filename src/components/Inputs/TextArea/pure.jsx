import React from 'react'

const TextArea = props => {
  return (
    <div className={`form__control ${props.className || ''} ${props.errors ? 'form__control--invalid' : ''}`}>
      <textarea
        className="form__input"
        value={props.value || ''}
        name={props.name}
        onChange={props.onChange}
        placeholder=" "
        style={{minHeight: props.minHeight}}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  )
}

export default TextArea
