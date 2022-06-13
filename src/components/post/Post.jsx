import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Comment from "./Comment";
import "./post.css";
import { notify } from "../notify/notify";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";

// eslint-disable-next-line react/prop-types
export default function Post({ img, userimg, username, post }) {
  const { token, user } = useContext(AuthContext);
  const [comments, setcomments] = useState(false);
  const [owner, setOwner] = useState(null);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(post.comments.length);

  const headers = {
    "x-access-token": token,
  };

  useEffect(() => {
    const fetchforum = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}forums/forum/${post.forum}`,
          { headers: headers }
        );
        if (res.data.ok) {
          setOwner({
            imageUrl: res.data.responseObject.displayPicUrl,
            name: res.data.responseObject.forumName,
          });
        } else {
          notify(false, "Error Occured While fetching Forum");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };

    const fetchOwner = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}users/user/${post.owner}`,
          { validateStatus: () => true, headers: headers }
        );
        if (res.data.ok) {
          setOwner({
            imageUrl: res.data.responseObject.profilePicture,
            name: res.data.responseObject.username,
          });
        } else {
          notify(false, "something Went wrong");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };

    if (post.forum) {
      fetchforum();
    } else {
      fetchOwner();
    }
  }, []);

  const likePost = async () => {
    setIsLiked(true);
    setLikeCount(likeCount + 1);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}post/${post._id}/like`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        notify(true, "Liked the post");
      } else {
        notify(false, "something Went wrong");
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      notify(false, "Network Error");
      setIsLiked(false);
    }
  };

  const unLikePost = async () => {
    setIsLiked(false);
    setLikeCount(likeCount - 1);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}post/${post._id}/unlike`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        notify(true, "DisLiked the post");
      } else {
        notify(false, "something Went wrong");
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      notify(false, "Network Error");
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    post && (
      <div className="post">
        {owner && (
          <div className="PostOwner">
            <div>
              <img
                className="topImg"
                src={process.env.REACT_APP_IMAGEKITURLENDPOINT + owner.imageUrl}
                alt=""
              ></img>
            </div>
            <span className="userName">{owner.name}</span>
          </div>
        )}
        <img
          className="postImg"
          src={process.env.REACT_APP_IMAGEKITURLENDPOINT + post.postUrl[0]}
          alt=""
        />
        <div className="postInfo">
          <div className="postCats">
            {post.tags.map((tag) => {
              return (
                <span className="postCat">
                  <Link className="link" to="/posts?cat=Music">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Link>
                </span>
              );
            })}

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
          <span className="postDate">{format(post.createdAt)}</span>
        </div>
        <p className="postDesc">
          {post.caption}
          1. Choose A Starting Strategy Most people will tell you to go
          mobile-first, but in reality, you should do whatever you feel more
          comfortable doing as long as your end result is a responsive website.
          These Are The Options You Have i. Mobile First Start small and scale
          up Media Queries will use (min-width) Desktop First ii. Start big and
          scale down Media Queries will use (max-width) Pick the one that works
          for you! &nbsp;&nbsp;
          <Link to="">Read More</Link>....
        </p>
        <div className="LikesAndComments">
          {isLiked ? (
            <i className="fas fa-thumbs-up" onClick={unLikePost}></i>
          ) : (
            <i className="far fa-thumbs-up" onClick={likePost}></i>
          )}
          <i
            className="far fa-comments"
            onClick={() => {
              setcomments(!comments);
            }}
          ></i>
          <p
            onClick={() => {
              setcomments(!comments);
            }}
          >
            {likeCount} Likes {commentCount} Comments
          </p>
        </div>
        {comments && (
          <Comment postId={post._id} commentCount={setCommentCount} commentsize={commentCount}/>
        )}
      </div>
    )
  );
}
