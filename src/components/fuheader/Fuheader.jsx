import Posts from "../posts/Posts";
import "./Fuheader.css";
import PostUploader from "../postuploader/PostUploader";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { notify } from "../notify/notify";

function SingleUserFollowing({id, token}) {
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
  )
}

function Followings({ids}) {
  const {token} = useContext(AuthContext);
  console.log(ids);
  return (
    <div className="FollowingsContainer">
      {
      ids.map((userId) => {
        return (
          <Link
            to={`/user/${userId}`}
            key={userId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SingleUserFollowing id={userId} token={token} />
          </Link>
        );
      })
      }
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
  console.log("ContentObject: ",contentObject);
  return (
    <div className="ForumMain">
      <img
        src="https://cdn.dubootcamp.com/wp-content/uploads/sites/66/2020/05/shutterstock_753780223-850x412.jpg"
        alt=""
        className="coverImg"
      />
      <div className="ProfileImg">
        <img
          src={process.env.REACT_APP_IMAGEKITURLENDPOINT+contentObject.profilePicture}
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
            <button className="FollowButton btn-10 custom-btn">
              <i className="fa-solid fa-circle-plus"></i> &nbsp;
              {source === "forum" ? "Join" : "Follow"}
            </button>
          </p>
          <span className="postDate">2 months ago</span>
        </center>
        <br></br>
        <p className="ForumDesc">
          {contentObject.desc}
        </p>
      </div>
      <br></br>
      {source === "user" && (
        <>
          <p className="FollowingsTitle">Followings</p>
          <br></br>
          <Followings ids={contentObject.followings}/>
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
