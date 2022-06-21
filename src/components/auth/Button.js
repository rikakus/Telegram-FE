import React from "react";

export default function Button(props) {
  return (
    <>
      {props.type === "google" ? (
        <button className="white-button">
          <i className="fa-brands fa-google"></i> Google
        </button>
      ) : (
        <button type="submit" className="blue-button">
          {props.title}
        </button>
      )}
    </>
  );
}
