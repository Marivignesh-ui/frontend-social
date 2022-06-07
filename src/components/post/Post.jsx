import { Link } from "react-router-dom";
import { useState } from "react";
import Comment from "./Comment";
import "./post.css";

// eslint-disable-next-line react/prop-types
export default function Post({ img, userimg, username,  }) {
  const [comments, setcomments] = useState(false);
  return (
    <div className="post">
      <div className="PostOwner">
        <div>
          <img
            className="topImg"
            src={userimg}
            alt=""
          ></img>
        </div>
        <span className="userName">{username}</span>
      </div>
      <img className="postImg" src={img} alt="" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              web design
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              responsive web
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            Best Web Development Practices
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
      1. Choose A Starting Strategy
Most people will tell you to go mobile-first, but
in reality, you should do whatever you feel more
comfortable doing as long as your end result is
a responsive website.
These Are The Options You Have
i. Mobile First
Start small and scale up
Media Queries will use (min-width)
Desktop First
ii. Start big and scale down
Media Queries will use (max-width)
Pick the one that works for you!
        &nbsp;&nbsp;
        <Link to="">Read More</Link>....
      </p>
      <div className="LikesAndComments">
        <i className="far fa-thumbs-up"></i>
        <i className="far fa-comments"></i>
        <p
          onClick={() => {
            setcomments(!comments);
          }}
        >
          23 Likes 51 Comments
        </p>
      </div>
      {comments && <Comment />}
    </div>
  );
}
