/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../assets/styles/chat.edit.css";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfile,
  editProfilePhoto,
  getDetailUsers,
} from "../../redux/actions/users";
import Title from "./Title";
import Profile from "./Profile";

export default function Edit(props) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState("");
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    bio: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const inputData = async () => {
    setLoading(true);
    await editProfile(form)
      .then(async (response) => {
        await dispatch(getDetailUsers());
        Swal.fire(response.data.message, "", "success");
        localStorage.setItem("users", JSON.stringify(detail.data));
        setLoading(false);
        return;
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      });
    setIsEdit(false);
  };

  useEffect(() => {
    dispatch(getDetailUsers());
  }, []);

  const detail = useSelector((state) => {
    return state.detailUser;
  });

  useEffect(() => {
    setUsers(detail.data);
    setPhoto(detail.data.photo);
    setForm({
      fullname: detail.data.fullname,
      phone: detail.data.phone,
      bio: detail.data.bio,
    });
  }, [detail]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const [photo, setPhoto] = useState(users.photo || "profile.jpg");
  const [isChangePhoto, setIsChangePhoto] = useState(false);
  const handleChangeImage = async () => {
    const formData = new FormData();
    formData.append("photo", photo);
    setLoading(true);
    await editProfilePhoto(formData)
      .then(async (response) => {
        await dispatch(getDetailUsers());
        Swal.fire(response.data.message, "", "success");
        setLoading(false);
        setIsChangePhoto(false);
        return;
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire(err.response.data.message, err.response.data.error, "error");
        setIsChangePhoto(false);
      });
  };

  return (
    <section
      className="detail-user"
      style={window.innerWidth > 550 ? null : { width: "100%" }}
      hidden={props.data.getDetail ? "" : "hidden"}
    >
      <Title
        fullname={users.fullname}
        setProfile={() => props.data.setGetDetail(!props.data.getDetail)}
      />

      {loading ? (
        <button className="btn btn-success btn-lg ms-2" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>{" "}
          Loading...
        </button>
      ) : (
        <Profile
          photo={users.photo}
          fullname={users.fullname}
          phone={users.phone}
        />
      )}
      <div className="detail">
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
      </div>
      <div className="account">
        <h3>Account</h3>
        <h6 hidden={!isEdit ? "" : "hidden"}>
          {users.phone ? users.phone : "-"}
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
