import React from 'react'

export default function Title(props) {
  return (
    <div className="title">
      <button className="back" onClick={() => props.setProfile()}></button>
      <h3>{props.fullname}</h3>
    </div>
  );
}
