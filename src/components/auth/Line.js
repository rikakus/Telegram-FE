import React from "react";

export default function Line(props) {
  return (
    <div className="form-text">
      <hr className="line" />
      <p>{props.title}</p>
      <hr className="line" />
    </div>
  );
}
