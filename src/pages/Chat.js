import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../assets/styles/chat.css";
import Edit from "../components/chat/Edit";
import List from "../components/chat/List";
import Message from "../components/chat/Message";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const [getDetail, setGetDetail] = useState(false);
  const [listChat, setListChat] = useState([]);
  const [activeReceiver, setActiveReceiver] = useState({});

  const [socketio, setSocketio] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.on("send-message-response", (response) => {
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      if (
        receiver.fullname === response[0].sender ||
        receiver.fullname === response[0].receiver
      ) {
        setListChat(response);
      }
    });
    setSocketio(socket);
  }, []);

  console.log(window.innerWidth);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <section className="chat">
      <List
        data={{
          getDetail,
          setGetDetail,
          activeReceiver,
          setActiveReceiver,
          setListChat,
          logout,
        }}
        socketio={socketio}
      />

      <Edit data={{ getDetail, setGetDetail, logout }} />

      <Message
        data={{
          listChat,
          activeReceiver,
          setActiveReceiver,
          setListChat,
        }}
        socketio={socketio}
      />
    </section>
  );
}
