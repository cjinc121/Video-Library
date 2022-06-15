import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, getVideo, search } from "../../features/video/videoSlice";
import { getAuth } from "../../features/auth/authSlice";
import { BiLogInCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import icon from "../../../src/BingeIT_.jpg";
function Header() {
  const authState = useSelector(getAuth);
  const dispatch = useDispatch();
  const { isUserLoggedIn } = authState;
  const videoState = useSelector(getVideo);
  const { video } = videoState;
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  let interval = useRef(null);

  function apiSearch() {
    if (input === "") setShowSearch([]);
    else
      setShowSearch(
        video
          .filter((item) =>
            item.title.toLowerCase().includes(input.toLowerCase())
          )
          .slice(0, 4)
      );
  }

  function debounce(func, delay) {
    return function () {
      if (interval) clearTimeout(interval.current);
      interval.current = setTimeout(() => {
        func();
      }, delay);
    };
  }
  const clickHandler = debounce(apiSearch, 200);

  useEffect(() => {
    clickHandler();
  }, [input]);
  return (
    <div className="header">
      <div className="brand-name" onClick={() => {
        navigate("/");
        setInput("")
        dispatch(search(""));
      }}>
        <img src={icon} className="brand-icon" />
        BingeIT
      </div>
      <div className="search-box">
        <input
          type="text"
          value={input}
          placeholder="Search"
          className="search-input"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {showSearch.length > 0 && <div className="search-dropdown">
          {showSearch.map((item) => {
            return (
              <div
                className="search-dropdown-pill"
                key={item._id}
                onClick={() => {
                  setInput("");
                  dispatch(search(item.title))
                }}
              >
                {item.title.slice(0, 40)}...
              </div>
            );
          })}
        </div>}
        {input.length > 0 && <button className="cancel-button" onClick={() => setInput("")}><ImCross className="cancel-icon" /></button>}
        <button
          className="search-button"
          onClick={() => {
            dispatch(search(input));
            dispatch(changeCategory("All"));
            setShowSearch([]);
            navigate("/");
          }}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      {!isUserLoggedIn && (
        <div className="user">
          Login
          <BiLogInCircle
            className="user-icon"
            onClick={() => navigate("/login")}
          />
        </div>
      )}
      {isUserLoggedIn && (
        <div className="user">
          <h4>Hi {currentUser.firstName}</h4>
          <FaUserCircle
            className="user-icon"
            onClick={() => navigate("/profile")}
          />
        </div>
      )}
    </div>
  );
}

export { Header };
