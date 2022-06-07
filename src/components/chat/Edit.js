import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../assets/styles/chat.edit.css";

export default function Edit(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const [form, setForm] = useState({
    fullname: users.fullname,
    phone: users.phone,
    bio: users.bio,
  });
  const [isEdit, setIsEdit] = useState(false);

  const inputData = async () => {
    setLoading(true);
    await axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/${users.id}`, form)
      .then(async (response) => {
        await getData();
        Swal.fire(response.data.message, "", "success");
        return;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
    setIsEdit(false);
  };
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${users.id}`)
      .then((response) => {
        setUsers(response.data.data);
        setPhoto(response.data.data.photo);
        localStorage.setItem("users", JSON.stringify(response.data.data));
        setLoading(false);
        return;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  const [photo, setPhoto] = useState(users.photo || "profile.jpg");
  const [isChangePhoto, setIsChangePhoto] = useState(false);
  const handleChangeImage = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${users.id}/photo`,
        formData
      )
      .then(async (response) => {
        await getData();
        Swal.fire(response.data.message, "", "success");
        setIsChangePhoto(false);
        return;
      })
      .catch((err) => {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
  };

  return (
    <section
      className="detail-user"
      hidden={props.data.getDetail ? "" : "hidden"}
    >
      <div className="title">
        <button
          className="back"
          onClick={() => props.data.setGetDetail(!props.data.getDetail)}
        ></button>
        <h3>{users.fullname}</h3>
      </div>

      <div className="detail">
        {loading ? (
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
          <>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${photo}`}
              alt="Profile"
              className="img-user"
            />
            <h3>{form.fullname}</h3>
            <p>{form.phone ? form.phone : "-"}</p>
            <label htmlFor="files" className="white-button">
              Edit Photo
            </label>
            <input
              className="hidden"
              hidden
              type="file"
              id="files"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
                setIsChangePhoto(true);
              }}
            />
            {isChangePhoto && (
              <button
                onClick={handleChangeImage}
                type="submit"
                className="blue-button"
              >
                Save Photo
              </button>
            )}
          </>
        )}
      </div>

      <div className="account">
        <h3>Account</h3>
        <h6 hidden={!isEdit ? "" : "hidden"}>
          {form.phone ? form.phone : "-"}
        </h6>
        <input
          type="text"
          className="input"
          placeholder="  your number"
          value={form.phone}
          hidden={isEdit ? "" : "hidden"}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <hr />
        <h6 hidden={!isEdit ? "" : "hidden"}>{form.fullname}</h6>
        <input
          type="text"
          className="input"
          placeholder="  your name"
          value={form.fullname}
          hidden={isEdit ? "" : "hidden"}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
        />
        <h6>Name</h6>
        <hr />
        <h6 hidden={!isEdit ? "" : "hidden"}>{form.bio ? form.bio : "-"}</h6>
        <input
          type="text"
          className="input"
          value={form.bio}
          placeholder="  your bio"
          hidden={isEdit ? "" : "hidden"}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <h6>Bio</h6>
        <button
          onClick={() => setIsEdit(true)}
          type="submit"
          className="blue-button"
          hidden={!isEdit ? "" : "hidden"}
        >
          Edit Data
        </button>
        <button
          onClick={() => inputData()}
          type="submit"
          className="blue-button"
          hidden={isEdit ? "" : "hidden"}
        >
          Save Data
        </button>
        <button
          onClick={() => setIsEdit(false)}
          type="submit"
          className="white-button"
          hidden={isEdit ? "" : "hidden"}
        >
          Cancel
        </button>
        <h3>Settings</h3>
        <div className="form-setting">
          <label>
            <i className="fa-regular fa-bell"></i>Notification and Sounds
          </label>
          <label>
            <i className="fa-solid fa-shield-halved"></i>Privaty and Security
          </label>
          <label>
            <i className="fa-solid fa-chart-line"></i>Data and Stronge
          </label>
          <label>
            <i className="fa-regular fa-message"></i>Chat settings
          </label>
          <label>
            <i className="fa-solid fa-desktop"></i>Devices
          </label>
          <label onClick={() => props.data.logout()}>
            <i className="fa-solid fa-power-off"></i>Log Out
          </label>
        </div>
      </div>
    </section>
  );
}
