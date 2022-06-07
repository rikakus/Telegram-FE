import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../../assets/styles/chat.message.css";

export default function Message(props) {
  const [socketio, setSocketio] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.on("send-message-response", (response) => {
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      if (
        receiver.fullname === response[0].sender ||
        receiver.fullname === response[0].receiver
      ) {
        props.data.setListChat(response);
      }
    });
    setSocketio(socket);
  }, [props.data]);

  const receiver = JSON.parse(localStorage.getItem("receiver"));

  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
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
      socketio.emit("send-message", data);
      setMessage("");
    }
  };

  return (
    <>
      <section className="message">
        {props.data.activeReceiver.id ? (
          <>
            <header>
              <div className="message-profile">
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
            
            <div className="content">
              {props.data.listChat.map((item, index) => (
                <div key={index}>
                  {item.sender === users.fullname ? (
                    <div className="sender">
                      <div className="sender-style">{item.message}</div>
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${
                          users.photo ? users.photo : "profile.jpg"
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
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="    type your message..."
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
        <div className="detail-user" hidden={profile ? "" : "hidden"}>
          <div className="title">
            <button className="back" onClick={() => setProfile(false)}></button>
            <h3>{receiver.fullname}</h3>
          </div>

          <div className="detail">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${
                receiver.photo || "profile.jpg"
              }`}
              alt="Profile"
              className="img-user"
            />
            <h3>{receiver.fullname}</h3>
            <p>{receiver.phone ? receiver.phone : "-"}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
