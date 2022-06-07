import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { notify } from "../notify/notify";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Forum({ forum }) {
  return (
    <>
      <div className="ForumWrapper">
        <img
          className="ForumImg"
          src="https://yt3.ggpht.com/ytc/AKedOLRA9H963jFZZF-w7cRJf6pV2l51trpu0mHCwNa-lw=s900-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <p>Programmers World</p>
      </div>
      <div className="ForumWrapper">
        <img
          className="ForumImg"
          src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/web-development_Ap6b_bSMM.jpeg"}
          alt=""
        />
        <p>Web dev Community</p>
      </div>
      <div className="ForumWrapper">
        <img
          className="ForumImg"
          src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/full-stack-web-developer_Bd2OUDJN9.png"}
          alt=""
        />
        <p>Full stack developers</p>
      </div>
    </>
  );
}

function SingleFollowing({ id, token }) {
  const headers = {
    "x-access-token": token,
  };
  const [followinguser, setFollowingUser] = useState({
    imageUrl: "",
    name: "",
  });
  useEffect(() => {
    async function fetchuser(id) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}users/user/${id}`,
          { headers: headers }
        );
        if (res.data.ok) {
          setFollowingUser({
            imageUrl: res.data.responseObject.profilePicture,
            name: res.data.responseObject.username,
          });
        } else {
          notify(false, "Error Occured While fetching user");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };

    fetchuser(id);
  },[]);
  return (
    <>
      <div className="ForumWrapper">
        <img
          className="topImg"
          src={
            process.env.REACT_APP_IMAGEKITURLENDPOINT + followinguser.imageUrl
          }
          alt=""
        />
        <p>{followinguser.name}</p>
      </div>
    </>
  );
}

function Following({ userIdList, token }) {
  return (
    <>
      {userIdList.map((userId) => {
        return (
          <Link
            to={`/user/${userId}`}
            key={userId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SingleFollowing id={userId} token={token} />
          </Link>
        );
      })}
      <div className="ForumWrapper">
        <img
          className="topImg"
          src={
            process.env.REACT_APP_IMAGEKITURLENDPOINT +
            "/aravindhan_KdQTJWmcF.jpg"
          }
          alt=""
        />
        <p>Aravindhan</p>
      </div>
      <div className="ForumWrapper">
        <img
          className="topImg"
          src={
            process.env.REACT_APP_IMAGEKITURLENDPOINT + "/joaquin_k9O7BiQzs.jpg"
          }
          alt=""
        />
        <p>Joaquin Raj</p>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
export default function Sidebar({ source }) {
  const { user, token } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">
          {source === "forum" ? "Admins" : "My Forums"}
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
          {source === "forum" ? "Members" : "Followings"}
        </span>
        <div className="ForumList">
          <Following userIdList={user.followings} token={token} />
        </div>
      </div>
    </div>
  );
}
