import React, { useContext, useRef, useState } from "react";
import "./PostUploader.css";
import { PermMedia, Label, BookOutlined } from "@material-ui/icons";
import { IKUpload } from "imagekitio-react";
import { Toaster } from "react-hot-toast";
import BlogEditor from "../blogeditor/BlogEditor";
import { AuthContext } from "../../context/AuthContext";
import { notify } from "../notify/notify";
import axios from "axios";
import Loader from "../../components/loader/loader";

function PostUploader() {
  const { token, user, isFetching,dispatch } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [editBlog, setEditBlog] = useState(false);
  const [taginput, setTagInput] = useState(false);
  const caption = useRef();
  const tags = useRef();

  const uploadImage = async (postDetail) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({type:"LOADING"})
      const res = await axios.post(
        `${process.env.REACT_APP_BACKENDPOINT}post/upload`,
        postDetail,
        { validateStatus: () => true, headers: headers }
      );
      console.log(res.data);
      console.log(postDetail);
      if (res.data.ok) {
        dispatch({type:"NOT_LOADING"})
        notify(true, res.data.message);
        setImages([]);
        caption.current.value = "";
        tags.current.value = "";
        setTagInput(false);
      } else {
        dispatch({type:"NOT_LOADING"});
        notify(false, res.data.message);
      }
    } catch (error) {
      dispatch({type:"NOT_LOADING"});
      notify(false, "Network Error");
    }
  };

  // "/career_YkK4FwiOZ.png","/careerlogo_nWoG9VLii.png"

  const postUploadHandler = (e) => {
    e.preventDefault();
    if (
      (tags.current.value === "") |
      (tags.current.value === undefined) |
      (tags.current.value === null)
    ) {
      console.log("came inside");
      notify(false, "Add some Tags to upload");
      setTagInput(true);
      return;
    }
    let postDetail = {
      caption: caption.current.value,
      owner: user._id,
      postType: "Image",
      postUrl: images,
      tags: tags.current.value.split(","),
    };
    uploadImage(postDetail);
  };

  const onError = (err) => {
    dispatch({type:"NOT_LOADING"});
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    dispatch({type:"NOT_LOADING"});
    const imagepath = res.filePath;
    setImages((images) => images.concat(imagepath));
  };

  return (
    // <div className="postuploader">
    <div className="share">
      <Toaster />
      {isFetching && <Loader />}
      <div className="shareWrapper">
        <form onSubmit={postUploadHandler}>
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={`${
                user && user.profilePicture
                  ? process.env.REACT_APP_IMAGEKITURLENDPOINT +
                    user.profilePicture
                  : process.env.REACT_APP_IMAGEKITURLENDPOINT +
                    "/no_avatar_TYi8DXgbZ.png"
              }`}
              alt=""
            />
            <div className="shareInputWrapper">
              <textarea
                placeholder="Share Your Learnings..."
                className="shareInput"
                ref={caption}
                required
              />
              <label style={{ display: taginput ? "inline-block" : "none" }}>
                Tags:
              </label>
              <input
                type="text"
                className="BlogTagInput"
                placeholder="Add , inbetween different tags..."
                ref={tags}
                style={{ display: taginput ? "inline-block" : "none" }}
              />
            </div>
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <label htmlFor="imageInput" className="imageInputLabel" onClick={()=>{dispatch("LOADING")}}>
                  <PermMedia htmlColor="tomato" className="shareIcon" />
                  <span className="shareOptionText">Photo or Video</span>
                </label>
                <IKUpload
                  onError={onError}
                  onSuccess={onSuccess}
                  id="imageInput"
                />
              </div>
              <div
                className="shareOption"
                onClick={() => {
                  setEditBlog(!editBlog);
                }}
              >
                <BookOutlined htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Blog</span>
              </div>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag People</span>
              </div>
              <div
                className="shareOption"
                onClick={() => {
                  setTagInput(!taginput);
                }}
              >
                <i className="fas fa-hashtag shareIcon"></i>
                <span className="shareOptionText">Add tags</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
          {images.length !== 0 && (
            <div className="shareImgContainer">
              {images.map((imagepath) => {
                return (
                  <div className="imagepreview" key={imagepath}>
                    <img
                      src={`${
                        process.env.REACT_APP_IMAGEKITURLENDPOINT + imagepath
                      }`}
                      alt=""
                      className="shareImg"
                    />
                    <button className="shareCancelImg">
                      <i className="far fa-times-circle"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </form>
      </div>
      {editBlog && <BlogEditor viewState={setEditBlog} />}
    </div>
    // </div>
  );
}

export default PostUploader;
