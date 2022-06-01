/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./sidebar.css";

// eslint-disable-next-line react/prop-types
function Forum({ forum }) {
  return (
    <div className="ForumWrapper">
      <img
        className="ForumImg"
        src="https://yt3.ggpht.com/ytc/AKedOLRA9H963jFZZF-w7cRJf6pV2l51trpu0mHCwNa-lw=s900-c-k-c0x00ffffff-no-rj"
        alt=""
      />
      <p>Programmers World</p>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Following({ User }) {
  return (
    <div className="ForumWrapper">
      <img
        className="topImg"
        src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <p>Vijay</p>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export default function Sidebar({ source }) {
  console.log(source);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">
          {source == "forum" ? "Admins" : "My Forums"}
        </span>
        <div className="ForumList">
          <Forum />
          <Forum />
          <Forum />
          <Forum />
          <Forum />
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          {source == "forum" ? "Members" : "Followings"}
        </span>
        <div className="ForumList">
          <Following />
          <Following />
          <Following />
          <Following />
        </div>
      </div>
    </div>
  );
}
