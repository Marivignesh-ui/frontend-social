import React from "react";
import "./PostUploader.css";
import { PermMedia, Label, BookOutlined } from "@material-ui/icons";

function PostUploader() {
  return (
    // <div className="postuploader">
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <input placeholder="Share Your Learnings..." className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <BookOutlined htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Blog</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag People</span>
            </div>
            <div className="shareOption">
              <i class="fas fa-hashtag shareIcon"></i>
              <span className="shareOptionText">Add tags</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default PostUploader;
