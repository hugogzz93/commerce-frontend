import React from "react";

const Input = props => {
  return (
    <div
      className={`form__control ${props.className || ""} ${
        props.errors ? "form__control--invalid" : ""
      }`}
    >
      <input
        className="form__input"
        type={props.type || "text"}
        value={props.value || ""}
        placeholder=" "
        name={props.name}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
      />
      <label htmlFor={props.name}>{props.label}</label>
      {props.errors && (
        <div className="form__errors fade-in">{props.errors}</div>
      )}
    </div>
  );
};

export default Input;
