import "./post.css";
import { useState, useContext, useEffect } from "react";
import { notify } from "../notify/notify";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import Comment from "./Comment";

// eslint-disable-next-line react/prop-types
export default function ImagePost({ post }) {
  const { token, user } = useContext(AuthContext);
  const [comments, setcomments] = useState(false);
  const [owner, setOwner] = useState(null);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount,setCommentCount] = useState(post.comments.length);

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
    <div className="post">
      {owner && (
        <div className="PostOwner">
          <div>
            <img
              className="topImg"
              src={
                post.forum !== null
                  ? process.env.REACT_APP_IMAGEKITURLENDPOINT + owner.imageUrl
                  : process.env.REACT_APP_IMAGEKITURLENDPOINT + owner.imageUrl
              }
              alt=""
            ></img>
          </div>
          <span className="userName">{owner.name}</span>
        </div>
      )}
      <img
        className="postImg"
        src={process.env.REACT_APP_IMAGEKITURLENDPOINT + post.postUrl}
        alt=""
      />
      <div className="postInfo">
        <span className="postDate">{format(post.createdAt)}</span>
      </div>
      <p className="postDesc">
        {post.caption}
        &nbsp;&nbsp;
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
      {comments && <Comment postId={post._id} commentCount={setCommentCount} commentsize={commentCount}/>}
    </div>
  );
}
