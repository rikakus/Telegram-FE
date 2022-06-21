/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../assets/styles/chat.list.css";
import { useDispatch, useSelector } from "react-redux";
import { getListUsers } from "../../redux/actions/users";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import dateFormat from "dateformat";
import { Code } from "react-content-loader";

export default function List(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
  const [listUser, setListUser] = useState([]);
  const [login, setlogin] = useState({});
  const [error, setError] = useState("");
  const [search, setSearch] = useState(queryParams);

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
    dispatch(getListUsers(search));
  };

  const list = useSelector((state) => {
    return state.listUser;
  });

  useEffect(() => {
    setlogin(users);
    dispatch(getListUsers(search));
  }, []);

  useEffect(() => {
    if (list.isError) {
      setError(list.isError);
    }
    setListUser(list.data);
  }, [list]);

  const selesctReceiver = (item) => {
    props.data.setListChat([]);
    props.data.setActiveReceiver(item);
    localStorage.setItem("receiver", JSON.stringify(item));
    props.socketio.emit("join-room", login);
    const data = {
      sender: login.id,
      receiver: item.id,
    };
    props.socketio.emit("chat-history", data);
  };

  return (
    <section
      className="user"
      style={window.innerWidth > 550 ? null : { width: "100%" }}
      hidden={
        window.innerWidth > 550
          ? !props.data.getDetail
            ? ""
            : "hidden"
          : !props.data.activeReceiver.id
          ? !props.data.getDetail
            ? ""
            : "hidden"
          : "hidden"
      }
    >
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
            placeholder="type your message..."
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
        {list.isLoading ? (
          <Code />
        ) : list.isError ? (
          <h4 style={{ width: "100%", textAlign: "center" }}>Data Not Found</h4>
        ) : (
          listUser.map((item, index) =>
            item.id !== login.id ? (
              <button
                type="button"
                className="form-contact"
                style={
                  JSON.parse(localStorage.getItem("receiver"))?.id === item.id
                    ? { backgroundColor: "#F5F5F5" }
                    : null
                }
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
                  <h4>{item.fullname}</h4>
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
          )
        )}
      </section>
    </section>
  );
}
