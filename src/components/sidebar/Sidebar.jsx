import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";
import { notify } from "../notify/notify";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SingleForum({ id, token }) {
  const headers = {
    "x-access-token": token,
  };
  const [forumsJoined, setForumsJoined] = useState({
    imageUrl: "",
    name: "",
  });
  useEffect(() => {
    async function fetchforum(id) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}forums/forum/${id}`,
          { headers: headers }
        );
        if (res.data.ok) {
          setForumsJoined({
            imageUrl: res.data.responseObject.displayPicUrl,
            name: res.data.responseObject.forumName,
          });
        } else {
          notify(false, "Error Occured While fetching Forum");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    }

    fetchforum(id);
  }, []);

  return (
    <div className="ForumWrapper">
      <img
        className="ForumImg"
        src={process.env.REACT_APP_IMAGEKITURLENDPOINT + forumsJoined.imageUrl}
        alt=""
      />
      <p>{forumsJoined.name}</p>
    </div>
  );
}

function Forum({ forumIdList, token }) {
  return (
    <>
      {forumIdList.map((forumId) => {
        return (
          <Link
            to={`/forum/${forumId}`}
            key={forumId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SingleForum id={forumId} token={token} />
          </Link>
        );
      })}
      {/* <div className="ForumWrapper">
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
          src={
            process.env.REACT_APP_IMAGEKITURLENDPOINT +
            "/web-development_Ap6b_bSMM.jpeg"
          }
          alt=""
        />
        <p>Web dev Community</p>
      </div>
      <div className="ForumWrapper">
        <img
          className="ForumImg"
          src={
            process.env.REACT_APP_IMAGEKITURLENDPOINT +
            "/full-stack-web-developer_Bd2OUDJN9.png"
          }
          alt=""
        />
        <p>Full stack developers</p>
      </div> */}
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
    }

    fetchuser(id);
  }, []);
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
      {(userIdList) && userIdList.map((userId) => {
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


export default function Sidebar({ source, contentObject }) {
  const { user, token } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="mockBanner">
        Done With your Preparations?<br></br> Overcome the fear of Interview with VR.<br></br><br></br>
        <Link to="/mockInterview" target={"_blank"}><button className="glow-on-hover">Practice Mock</button></Link>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          {source === "forum" ? "Admins" : "My Forums"}
        </span>
        <div className="ForumList">
          {source === "forum" ? (
            contentObject && (contentObject.admin.length !== 0) ? <Following userIdList={contentObject?.admin} token={token} /> : <div className="NoForumDiv">No Admins in the Forum</div>
          ) : (
            user && (user.forumsJoined.length !==0) ? <Forum forumIdList={user.forumsJoined} token={token} /> : <div className="NoForumDiv">No Forums Joined</div>
          )}
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          {source === "forum" ? "Members" : "Followings"}
        </span>
        <div className="ForumList">
          {source === "forum" ? (
            contentObject && (contentObject.members.length !== 0) ? <Following userIdList={contentObject?.members} token={token} /> : <div className="NoForumDiv">No Members in the Forum</div>
          ) : (
            user && (user.followings.length !== 0) ? <Following userIdList={user.followings} token={token} /> : <div className="NoForumDiv">Follow someone</div>
          )}
        </div>
      </div>
    </div>
  );
}
