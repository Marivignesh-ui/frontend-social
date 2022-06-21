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
  
  const [followinguser, setFollowingUser] = useState({
    imageUrl: "",
    name: "",
  });
  useEffect(() => {
    const headers = {
      "x-access-token": token,
    };
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
    </div>
  );
}

export default function Fuheader({ source, contentObject }) {
  const [postList, setPostList] = useState([]);
  console.log("ContentObject: ", contentObject);
  const { user, token, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const headers = {
      "x-access-token": token,
    };
    const fetchPosts = async () => {
      try {
        let url;
        if(source === "forum"){
          url=`post/forum/${contentObject._id}`;
        }else{
          url = `post/user/${contentObject._id}`;
        }
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT+url}`,
          { validateStatus: () => true, headers: headers }
        );
        if (res.data.ok) {
          setPostList(res.data.responseObject);
        } else {
          notify(false, "Something went wrong");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };

    fetchPosts();
  }, [contentObject._id,source,token]);

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

  const unFollowUser = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    console.log(headers);
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}users/unfollow?id=${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "UNFOLLOW", payload: id });
        dispatch({ type: "NOT_LOADING" });
        notify(true, "Unfollowed User");
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
      notify(false, "Network error");
    }
  };

  const followUser = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}users/follow?id=${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "FOLLOW", payload: id });
        dispatch({ type: "NOT_LOADING" });
        notify(true, "Followed User");
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
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
            {source === "forum" ?contentObject.forumName:contentObject.username}
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
              <button className="FollowButton btn-10 custom-btn" onClick={() => unFollowUser(contentObject._id)}>
                <i className="fa-solid fa-minus-circle"></i> &nbsp; UnFollow
              </button>
            ) : (
              <button className="FollowButton btn-10 custom-btn" onClick={() => followUser(contentObject._id)}>
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
      <Posts postList={postList} />
    </div>
  );
}
