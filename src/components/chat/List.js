import React, { useState, useEffect } from "react";
import "../../assets/styles/chat.list.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import io from "socket.io-client";
import { useNavigate, useSearchParams } from "react-router-dom";
import dateFormat from "dateformat";

export default function List(props) {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [socketio, setSocketio] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));

  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [login, setlogin] = useState({});
  const [error, setError] = useState("");
  const [search, setSearch] = useState(queryParams);

  const getData = () => {
    setError("");
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/users?login=${users.id}&search=${search}`
      )
      .then((response) => {
        setListUser(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/chat?search=${search}`);
    getData();
  };

  useEffect(() => {
    setLoading(true);
    setlogin(users);
    getData();
  }, []);

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
  }, []);

  const selesctReceiver = (item) => {
    props.data.setListChat([]);
    props.data.setActiveReceiver(item);
    localStorage.setItem("receiver", JSON.stringify(item));
    socketio.emit("join-room", login);
    const data = {
      sender: login.id,
      receiver: item.id,
    };
    socketio.emit("chat-history", data);
  };

  return (
    <section className="user" hidden={!props.data.getDetail ? "" : "hidden"}>
      <header>
        <h2>Telegram</h2>
        <Dropdown
          direction="down"
          className="form-user"
          isOpen={isOpen}
          toggle={() => setIsOpen(!isOpen)}
        >
          <DropdownToggle>
            <i className="fa-solid fa-bars"></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => props.data.setGetDetail(!props.data.getDetail)}
            >
              <i className="fa-solid fa-gear"></i>Settings
            </DropdownItem>
            <DropdownItem>
              <i className="fa-regular fa-user"></i>Contacts
            </DropdownItem>
            <DropdownItem>
              <i className="fa-solid fa-phone"></i>Calls
            </DropdownItem>
            <DropdownItem>
              <i className="fa-regular fa-bookmark"></i>Save messages
            </DropdownItem>
            <DropdownItem>
              <i className="fa-solid fa-user-plus"></i>Invite Friends
            </DropdownItem>
            <DropdownItem>
              <i className="fa-regular fa-circle-question"></i>Telegram FAQ
            </DropdownItem>
            <DropdownItem onClick={() => props.data.logout()}>
              <i className="fa-solid fa-power-off"></i>Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>

      <section>
        <form className="search-section" onSubmit={onSubmit}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="  type your message..."
            className="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        {error.length > 0 && (
          <div className="alert alert-danger mx-0" style={{ width: "100%" }}>
            <p>{error}</p>
          </div>
        )}
      </section>

      <section className="contact">
        {loading
          ? "loading"
          : listUser.map((item, index) =>
              item.id !== login.id ? (
                <button
                  type="button"
                  className="form-contact"
                  onClick={() => selesctReceiver(item)}
                  key={index}
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${
                      item.photo ? item.photo : "profile.jpg"
                    }`}
                    alt="Profile"
                    className="img-contact"
                  />
                  <div className="name-contact">
                    <h3>{item.fullname}</h3>
                    <p>
                      {item.message.length === 0 ? "" : item.message[0].message}
                    </p>
                  </div>
                  <div className="detail-message">
                    <p>
                      {item.message.length === 0
                        ? ""
                        : dateFormat(item.message[0].date, "HH:MM")}
                    </p>
                    {/* <i>new</i> */}
                  </div>
                </button>
              ) : null
            )}
      </section>
    </section>
  );
}
