import React, { useState, useEffect } from "react";
import Input from "../Inputs/TextInput";

export default props => {
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState("");

  const body = props.auth_token ? (
    <div>{props.email}</div>
  ) : (
    <React.Fragment>
      <form
        className="grid-1 row-gap-15"
        onSubmit={e => {
          e.preventDefault();
          props.login(email, password);
        }}
      >
        <Input
          label="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
        />
        <Input
          label="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        {props.login_failed && <span>* Wrong username or password</span>}
        <button className="button btn--orng-white" type="submit">
          Sign In
        </button>
      </form>
    </React.Fragment>
  );

  return (
    <div
      className={`card card--no-bg shadow--high ${
        props.active ? "" : "shrunk"
      }`}
      style={{ background: "#fa7354" }}
    >
      {body}
    </div>
  );
};
