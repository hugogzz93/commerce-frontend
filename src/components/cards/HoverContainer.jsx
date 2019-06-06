import React, { useEffect, useState } from "react";

const HoverContainer = props => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`${active ? "card" : ""}`}
      onClick={() => setActive(!active)}
    >
      <div>{props.children}</div>
      <div className={`${active ? "" : "shrunk"}`}>{props.detail}</div>
    </div>
  );
};

export default HoverContainer;
