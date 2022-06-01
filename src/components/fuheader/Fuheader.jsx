/* eslint-disable react/prop-types */
import Posts from "../posts/Posts";
import "./Fuheader.css";
import PostUploader from "../postuploader/PostUploader";

function Followings() {
  const PF = process.env.PUBLIC_URL;
  return (
    <div className="FollowingsContainer">
      <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
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
          src={PF + "assets/person/no_avatar.png"}
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
      </div>
      <div className="Followingsuser">
        <img
          className="FollowingsAvatar"
          src={PF + "assets/person/no_avatar.png"}
          alt=""
        />
        <center>
          <p>username</p>
        </center>
      </div>
    </div>
  );
}

export default function Fuheader({ source, contentobject }) {
  console.log(source, contentobject);
  return (
    <div className="ForumMain">
      <img
        src="https://cdn.dubootcamp.com/wp-content/uploads/sites/66/2020/05/shutterstock_753780223-850x412.jpg"
        alt=""
        className="coverImg"
      />
      <div className="ProfileImg">
        <img
          src="https://miro.medium.com/max/1187/1*0FqDC0_r1f5xFz3IywLYRA.jpeg"
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
            Forum Title
            <button className="FollowButton btn-10 custom-btn">
              <i className="fa-solid fa-circle-plus"></i> &nbsp;
              {source === "forum" ? "Join" : "Follow"}
            </button>
          </p>
          <span className="postDate">2 months ago</span>
        </center>
        <br></br>
        <p className="ForumDesc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad tempora
          illo beatae numquam, labore nihil voluptas eveniet, blanditiis ipsum,
          repellat reiciendis? Ullam blanditiis libero et neque cupiditate
          veniam, animi commodi!
        </p>
      </div>
      <br></br>
      {source === "user" && (
        <>
          <p className="FollowingsTitle">Followings</p>
          <br></br>
          <Followings />
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
