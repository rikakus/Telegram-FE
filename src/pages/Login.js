import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/styles/auth.css";
import { login } from "../redux/actions/auth";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    login(form)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("users", JSON.stringify(response.data.data.id));
        Swal.fire("", response.data.message, "success");
        return navigate("/chat");
      })
      .catch((err) => {
        setErrors(err);
      });
    setIsLoading(false);
  };
  return (
    <>
      <section className="auth">
        <div className="hero">
          <h3>Login</h3>
          <h6>Hi, Welcome back!</h6>
          <form onSubmit={(e) => onSubmit(e)} style={{ width: "100%" }}>
            <div className="form-input">
              <div className="title-input">Email</div>
              <input
                type="email"
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
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span
                  className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                ></span>
              </button>
            </div>
            <p style={{ color: "#7E98DF", textAlign: "right", width: "100%" }}>
              <Link to="/forgot" style={{ color: "#7E98DF" }}>
                Forgot password?
              </Link>
            </p>
            {errors.length > 0 && (
              <div
                className="alert alert-danger mx-0"
                style={{ width: "100%" }}
              >
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
              <button type="submit" className="blue-button">
                Login
              </button>
            )}
          </form>
          <div className="form-text">
            <hr className="line" />
            <p>Login with</p>
            <hr className="line" />
          </div>
          <button className="white-button">
            <i className="fa-brands fa-google"></i> Google
          </button>
          <p>
            Don't have an account?
            <Link
              to="/register"
              style={{ color: "#7E98DF", marginLeft: "5px", fontWeight: "500" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
