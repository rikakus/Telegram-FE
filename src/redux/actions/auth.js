import axios from "axios";

export const register = (form) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/register", form)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          if (Array.isArray(err.response.data.error)) {
            reject(err.response.data.error);
          } else {
            reject([{ msg: err.response.data.error }]);
          }
        } else {
          reject([{ msg: err.message }]);
        }
      });
  });
};

export const login = (form) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, form)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        if (err.response) {
          if (Array.isArray(err.response.data.error)) {
            reject(err.response.data.error);
          } else {
            reject([{ msg: err.response.data.error }]);
          }
        } else {
          reject([{ msg: err.message }]);
        }
      });
  });
};
