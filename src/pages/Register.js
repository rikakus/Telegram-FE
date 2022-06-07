import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/styles/auth.css";
import { register } from "../redux/actions/auth";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    console.log(errors);
    register(form)
      .then((response) => {
        console.log(response);
        Swal.fire(response.data.message, "Now you can login", "success");
        return navigate("/login");
      })
      .catch((err) => {
        setErrors(err);
      });
    console.log(errors);
    setIsLoading(false);
  };
  return (
    <>
      <section className="auth">
        <div className="hero">
          <div className="title">
            <button
              className="back"
              onClick={() => navigate("/login")}
            ></button>
            <h3>Register</h3>
          </div>
          <h6>Let’s create your account!</h6>
          <div className="form-input">
            <div className="title-input">Name</div>
            <input
              type="text"
              className="input"
              placeholder="  your name"
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
          </div>
          <div className="form-input">
            <div className="title-input">Email</div>
            <input
              type="text"
              className="input"
              placeholder="  example@gmail.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-input">
            <div className="title-input">Password</div>
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="  your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span
                className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></span>
            </button>
          </div>
          {errors.length > 0 && (
            <div className="alert alert-danger mx-0" style={{ width: "100%" }}>
              <ul className="m-0">
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}
          {isLoading ? (
            <button
              className="btn btn-success btn-lg ms-2"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="blue-button"
              onClick={(e) => onSubmit(e)}
            >
              Register
            </button>
          )}
          <div className="form-text">
            <hr className="line" />
            <p>Register with</p>
            <hr className="line" />
          </div>
          <button className="white-button">
            <i className="fa-brands fa-google"></i> Google
          </button>
        </div>
      </section>
    </>
  );
}
