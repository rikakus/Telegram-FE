import React, { useState } from "react";
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
          setActiveReceiver,
          setListChat,
          logout,
        }}
      />

      <Edit data={{ getDetail, setGetDetail, logout }} />

      <Message
        data={{
          listChat,
          activeReceiver,
          setActiveReceiver,
          setListChat,
        }}
      />
    </section>
  );
}
