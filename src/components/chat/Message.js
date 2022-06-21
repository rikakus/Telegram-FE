/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUsers } from "../../redux/actions/users";
import "../../assets/styles/chat.message.css";
import Swal from "sweetalert2";
import Profile from "./Profile";
import Title from "./Title";
// import fotoDefault from "../../assets/image/default.jpg"

export default function Message(props) {
  const dispatch = useDispatch();
  const receiver = JSON.parse(localStorage.getItem("receiver"));
  const [message, setMessage] = useState("");
  const [deleted, setDeleted] = useState("");
  const [profile, setProfile] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
  const detail = useSelector((state) => {
    return state.detailUser;
  });

  useEffect(() => {
    setTimeout(() => {
      const elem = document.getElementById("chatMenuMessage");
      elem.scrollTop = elem.scrollHeight;
    }, 100);
    setDeleted("");
  }, [props.data.activeReceiver.id]);

  const onSubmitMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const payload = {
        sender: users.fullname,
        receiver: receiver.fullname,
        message,
      };
      props.data.setListChat([...props.data.listChat, payload]);
      const data = {
        sender: users.id,
        receiver: props.data.activeReceiver.id,
        message,
      };
      props.socketio.emit("send-message", data);

      setMessage("");

      setTimeout(() => {
        const elem = document.getElementById("chatMenuMessage");
        elem.scrollTop = elem.scrollHeight;
      }, 100);
      dispatch(getListUsers(""));
    }
  };
  const deleteMesssage = (id, index) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleted("");
        const newListChat = props.data.listChat.filter((e, i) => {
          if (i !== index) {
            return e;
          }
        });
        props.data.setListChat(newListChat);
        const data = {
          id,
          sender: users.id,
          receiver: props.data.activeReceiver.id,
        };
        props.socketio.emit("delete-message", data);
      }
    });
  };

  return (
    <>
      <section
        className="message"
        hidden={
          window.innerWidth > 550
            ? ""
            : props.data.activeReceiver.id
            ? profile
              ? "hidden"
              : ""
            : "hidden"
        }
      >
        {props.data.activeReceiver.id ? (
          <>
            <header>
              <div className="message-profile">
                {window.innerWidth < 550 ? (
                  <button
                    onClick={() => props.data.setActiveReceiver("")}
                    className="back fa-solid fa-angle-left"
                  ></button>
                ) : null}

                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${
                    receiver.photo ? receiver.photo : "profile.jpg"
                  }`}
                  alt="Profile"
                  className="message-image"
                />
                <div className="name">
                  <h3>{receiver.fullname}</h3>
                  <p>cek</p>
                </div>
              </div>
              <i className="fa-solid fa-grip">
                <button onClick={() => setProfile(true)}></button>
              </i>
            </header>

            <div className="content" id="chatMenuMessage">
              {props.data.listChat.map((item, index) => (
                <div key={index}>
                  {item.sender === detail.data.fullname ? (
                    <div className="sender" onClick={() => setDeleted(item.id)}>
                      {deleted === item.id ? (
                        <button
                          className="fa-solid fa-trash"
                          onClick={() => deleteMesssage(item.id, index)}
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            marginRight: "10px",
                          }}
                        ></button>
                      ) : null}

                      <div className="sender-style">{item.message}</div>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${
                          detail.data.photo ? detail.data.photo : "profile.jpg"
                        }`}
                        alt="Profile"
                        className="content-image"
                      />
                    </div>
                  ) : (
                    <div className="receiver">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${
                          receiver.photo ? receiver.photo : "profile.jpg"
                        }`}
                        alt="Profile"
                        className="content-image"
                      />
                      <div className="receiver-style">{item.message}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <footer>
              <form onSubmit={onSubmitMessage} style={{ width: "100%" }}>
                <input
                  type="text"
                  style={{ padding: "0px 20px" }}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="type your message..."
                  value={message}
                />
                <button type="submit">Send</button>
              </form>
            </footer>
          </>
        ) : (
          <div className="center">Please select a chat to start messaging</div>
        )}
      </section>
      {receiver ? (
        <div
          className="detail-user"
          hidden={profile ? "" : "hidden"}
          style={window.innerWidth > 550 ? null : { width: "100%" }}
        >
          <Title
            fullname={receiver.fullname}
            setProfile={() => setProfile(false)}
          />

          <Profile
            photo={receiver.photo}
            fullname={receiver.fullname}
            phone={receiver.phone}
          />
        </div>
      ) : null}
    </>
  );
}
