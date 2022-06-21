import axios from "axios";
import {
  GET_LIST_USERS_PENDING,
  GET_LIST_USERS_SUCCESS,
  GET_LIST_USERS_FAILED,
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
} from "./types";

const user = JSON.parse(localStorage.getItem("users"));

export const getListUsers = (search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_LIST_USERS_PENDING,
        payload: null,
      });

      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users?login=${user.id}&search=${search}`
      );

      dispatch({
        type: GET_LIST_USERS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_USERS_FAILED,
        payload: error.message,
      });
    }
  };
};

export const getDetailUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_DETAIL_USER_PENDING,
        payload: null,
      });
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`
      );

      dispatch({
        type: GET_DETAIL_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_DETAIL_USER_FAILED,
        payload: error.message,
      });
    }
  };
};

export const editProfile = (form) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, form)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const editProfilePhoto = (formData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}/photo`, formData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
