import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { notify } from "../notify/notify";
import { useRef } from "react";

function SingleComment({comment}) {
  const [commentowner, setOwner] = useState(null);
  const { token } = useContext(AuthContext);

  const headers = {
    "x-access-token": token,
  };

  useEffect(()=>{
    const fetchOwner = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}users/user/${comment.owner}`,
          { headers: headers }
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
    fetchOwner();
  },[])

  return (
    <div className="CommentBox">
      <img
        className="UserAvatar"
        src={commentowner && process.env.REACT_APP_IMAGEKITURLENDPOINT+commentowner.imageUrl}
        alt=""
      />
      <div className="CommentDesc">
        {comment.desc}
      </div>
    </div>
  )

}

export default function Comment({ postId, commentCount, commentsize }) {
  const { token,user } = useContext(AuthContext);
  const [commentList, setCommentList] = useState([]);
  const newComment = useRef();
  
  const headers = {
    "x-access-token": token,
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}post/${postId}/getcomments`,
          { validateStatus: () => true, headers: headers }
        );
        if (res.data.ok) {
          setCommentList(res.data.responseObject);
        } else {
          notify(false, "Something Went Wrong");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };

    fetchComments();
  }, []);

  const postComment =  async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKENDPOINT}post/${postId}/comment`,{desc:newComment.current.value},{validateStatus:()=>true,headers:headers});
      if(res.data.ok){
        notify(true,"comment added");
        setCommentList([...commentList,res.data.responseObject]);
        newComment.current.value="";
        commentCount(commentsize+1);
      }else{
        notify(false,"something went wrong");
      }
    } catch (error) {
      notify(false, "Network Error");
    }
  }

  return (
    <div className="CommentWrapper">
      <div className="CommentContainer">
        <div className="commentInput">
          <img
            className="UserAvatar"
            src={process.env.REACT_APP_IMAGEKITURLENDPOINT+user.profilePicture}
            alt=""
          />
          <textarea
            className="commentTextArea"
            placeholder="Post your comments..."
            ref={newComment}
          />
          <button className="custom-btn btn-1" onClick={postComment}>Post</button>
        </div>
        {commentList.length!==0 && commentList.map((comment) => {
          return (
            <SingleComment comment={comment} />
          );
        })}

        <div className="CommentBox">
          <img
            className="UserAvatar"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="CommentDesc">
            Valuable Post needed. Useful for everyone's Career. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Commodi beatae
            explicabo repellendus sunt. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nesciunt expedita praesentium et dolor sequi eos
            fuga ducimus pariatur, laboriosam harum asperiores non nam saepe.
            Ipsum alias est doloribus tenetur ut.
          </div>
        </div>
        <div className="CommentBox">
          <img
            className="UserAvatar"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="CommentDesc">
            Valuable Post needed. Useful for everyone's Career
          </div>
        </div>
        <div className="CommentBox">
          <img
            className="UserAvatar"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="CommentDesc">
            Valuable Post needed. Useful for everyone's Career. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Commodi beatae
            explicabo repellendus sunt. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nesciunt expedita praesentium et dolor sequi eos
            fuga ducimus pariatur, laboriosam harum asperiores non nam saepe.
            Ipsum alias est doloribus tenetur ut.
          </div>
        </div>
        <div className="CommentBox">
          <img
            className="UserAvatar"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="CommentDesc">
            Valuable Post needed. Useful for everyone's Career. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Commodi beatae
            explicabo repellendus sunt. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nesciunt expedita praesentium et dolor sequi eos
            fuga ducimus pariatur, laboriosam harum asperiores non nam saepe.
            Ipsum alias est doloribus tenetur ut.
          </div>
        </div>
        <div className="CommentBox">
          <img
            className="UserAvatar"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="CommentDesc">
            Valuable Post needed. Useful for everyone's Career. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Commodi beatae
            explicabo repellendus sunt. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Nesciunt expedita praesentium et dolor sequi eos
            fuga ducimus pariatur, laboriosam harum asperiores non nam saepe.
            Ipsum alias est doloribus tenetur ut.
          </div>
        </div>
      </div>
    </div>
  );
}
