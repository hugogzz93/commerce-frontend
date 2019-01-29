import React from 'react'

const TextArea = props => {
  return (
    <div className={`form__control ${props.className}`}>
      <textarea
        className="form__input"
        value={props.value || ''}
        name={props.name}
        onChange={props.onChange}
        placeholder=" "
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  )
}

export default TextArea
