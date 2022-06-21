import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/styles/auth.css";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Line from "../components/auth/Line";
import { login } from "../redux/actions/auth";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        console.log(response);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("users", JSON.stringify(response.data.data.id));
        Swal.fire("", response.data.message, "success");
        return navigate("/");
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
            <Input
              title="Email"
              type="email"
              placeholder="  example@gmail.com"
              setData={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              title="Password"
              type="password"
              placeholder="  your password"
              setData={(e) => setForm({ ...form, password: e.target.value })}
            />

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
              <Button type="submit" title="Login" />
            )}
          </form>
          <Line title="Login with" />
          <Button type="google" />
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
