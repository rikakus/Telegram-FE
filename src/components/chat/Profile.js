import React from 'react'

export default function Profile(props) {
  return (
    <div className="detail">
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/${
          props.photo || "profile.jpg"
        }`}
        alt="Profile"
        className="img-user"
      />
      <h3>{props.fullname}</h3>
      <p>{props.phone ? props.phone : "-"}</p>
    </div>
  );
}
