import React from "react";
import roots from "../../images/roots.svg";
import "../../style/cards/thumbcard.sass";

const ThumbCard = props => {
  const { title, subtitle, selected, onClick } = props;

  return (
    <div
      className={`card card--clickable grid-6 flex--align-center ${
        props.className
      }`}
      onClick={onClick}
    >
      <img className="col-1 thumb-nail" src={roots} alt={"thumbnail"} />
      <div className="col-5 grid-1 row-gap-5 t--align-l">
        <div className="t--strong">{title}</div>
        <div className="">{subtitle}</div>
      </div>
    </div>
  );
};

export default ThumbCard;
