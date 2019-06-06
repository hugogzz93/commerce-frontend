import React from "react";
import "../../style/cards/imagecard.sass";

const ImageTag = ({ source, alt }) => {
  if (source) source = source.replace(new RegExp(" ", "g"), "%20");
  return (
    <div
      className="image-card"
      alt={alt}
      style={{ backgroundImage: `url( ${source} )` }}
    >
      {" "}
    </div>
  );
};

export default ImageTag;
