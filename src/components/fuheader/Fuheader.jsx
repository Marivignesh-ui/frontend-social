import Posts from "../posts/Posts";
import "./Fuheader.css";
import PostUploader from "../postuploader/PostUploader";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { notify } from "../notify/notify";
import { format } from "timeago.js";

function SingleUserFollowing({ id, token }) {
  const headers = {
    "x-access-token": token,
  };
  const [followinguser, setFollowingUser] = useState({
    imageUrl: "",
    name: "",
  });
  useEffect(() => {
    async function fetchfollowings(id) {
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

    fetchfollowings(id);
  }, []);

  return (
    <div className="Followingsuser">
      <img
        className="FollowingsAvatar"
        src={process.env.REACT_APP_IMAGEKITURLENDPOINT + followinguser.imageUrl}
        alt=""
      />
      <center>
        <p>{followinguser.name}</p>
      </center>
    </div>
  );
}

function Followings({ ids }) {
  const { token } = useContext(AuthContext);
  console.log(ids);
  return (
    <div className="FollowingsContainer">
      {ids.map((userId) => {
        return (
          <Link
            to={`/user/${userId}`}
            key={userId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SingleUserFollowing id={userId} token={token} />
          </Link>
        );
      })}
      {/* <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
          alt=""
        />
        <center>
          <p>username</p>
        </center>
      </div>
      <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/no_avatar_TYi8DXgbZ.png"}
          alt=""
        />
        <center>
          <p>username</p>
        </center>
      </div>
      <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
          alt=""
        />
        <center>
          <p>username</p>
        </center>
      </div>
      <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
          alt=""
        />
        <center>
          <p>username</p>
        </center>
      </div> */}
      {/* <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/no_avatar_TYi8DXgbZ.png"}
          alt=""
        />
        <center>
          <p>username</p>
        </center>
      </div> */}
    </div>
  );
}

export default function Fuheader({ source, contentObject }) {
  console.log("ContentObject: ", contentObject);
  const { user, token, dispatch } = useContext(AuthContext);

  const leaveForum = async () => {
    const headers = {
      "x-access-token": token,
    };
    console.log(headers);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}forums/leave/${contentObject._id}`,"",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "LEAVE_FORUM", payload: contentObject._id });
        notify(true, "Left from forum");
      } else {
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      notify(false, "Network error");
    }
  };

  const joinForum = async () => {
    const headers = {
      "x-access-token": token,
    };
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}forums/join/${contentObject._id}`,"",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "JOIN_FORUM", payload: contentObject._id });
        notify(true, "Joined forum");
      } else {
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      notify(false, "Network error");
    }
  };
  return (
    <div className="ForumMain">
      <img
        src="https://cdn.dubootcamp.com/wp-content/uploads/sites/66/2020/05/shutterstock_753780223-850x412.jpg"
        alt=""
        className="coverImg"
      />
      <div className="ProfileImg">
        <img
          src={
            source === "forum"
              ? process.env.REACT_APP_IMAGEKITURLENDPOINT +
                contentObject.displayPicUrl
              : process.env.REACT_APP_IMAGEKITURLENDPOINT +
                contentObject.profilePicture
          }
          alt=""
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="ForumInfo">
        <center>
          <p className="ForumTitle">
            {contentObject.username}
            {source === "forum" ? (
              user.forumsJoined.includes(contentObject._id) ? (
                <button
                  className="FollowButton btn-10 custom-btn"
                  onClick={() => leaveForum(contentObject._id)}
                >
                  <i className="fa-solid fa-minus-circle"></i> &nbsp; Leave
                </button>
              ) : (
                <button
                  className="FollowButton btn-10 custom-btn"
                  onClick={joinForum}
                >
                  <i className="fa-solid fa-circle-plus"></i> &nbsp; Join
                </button>
              )
            ) : user.followings.includes(contentObject._id) ? (
              <button className="FollowButton btn-10 custom-btn">
                <i className="fa-solid fa-minus-circle"></i> &nbsp; UnFollow
              </button>
            ) : (
              <button className="FollowButton btn-10 custom-btn">
                <i className="fa-solid fa-circle-plus"></i> &nbsp; Follow
              </button>
            )}
          </p>
          <span className="postDate">{format(contentObject.createdAt)}</span>
        </center>
        <br></br>
        <p className="ForumDesc">{contentObject.desc}</p>
      </div>
      <br></br>
      {source === "user" && (
        <>
          <p className="FollowingsTitle">Followings</p>
          <br></br>
          <Followings ids={contentObject.followings} />
        </>
      )}
      <hr></hr>
      <br></br>
      <br></br>
      {source === "forum" && <PostUploader />}
      <Posts />
    </div>
  );
}
