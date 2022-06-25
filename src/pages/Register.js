import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/styles/auth.css";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Line from "../components/auth/Line";
import { register } from "../redux/actions/auth";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    register(form)
      .then((response) => {
        console.log(response);
        Swal.fire(response.data.message, "Now you can login", "success");
        return navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err);
      });

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
          <Input
            title="Name"
            type="text"
            placeholder="  your name"
            setData={(e) => setForm({ ...form, fullname: e.target.value })}
          />
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
          <Line title="Register with" />
          <Button type="google" />
        </div>
      </section>
    </>
  );
}
