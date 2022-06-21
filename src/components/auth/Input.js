import React, { useState } from "react";

export default function Input(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {props.type !== "password" ? (
        <div className="form-input">
          <div className="title-input">{props.title}</div>
          <input
            type={props.type}
            className="input"
            placeholder={props.placeholder}
            onChange={(e) => props.setData(e)}
          />
        </div>
      ) : (
        <div className="form-input">
          <div className="title-input">Password</div>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="  your password"
            onChange={(e) => props.setData(e)}
          />
          <button
            type="button"
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span
              className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
            ></span>
          </button>
        </div>
      )}
    </>
  );
}
