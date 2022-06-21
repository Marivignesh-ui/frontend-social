import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { IKUpload } from "imagekitio-react";
import { AuthContext } from "../../context/AuthContext";
import "./CreateForum.css";
import { useRef } from "react";
import { useState } from "react";
import { notify } from "../../components/notify/notify";
import {useHistory} from "react-router-dom";
import axios from "axios";

export default function CreateForum() {
  const { dispatch, token } = useContext(AuthContext);
  const [coverPicUrl,setCoverPic] = useState("/forum_cover_pic_Sgvs8hp8d.png");
  const [displayPic,setDisplayPic] = useState("/forum_avatar_fvHjRTolz.png");
  let history = useHistory();
  const forumName = useRef();
  const forumDesc = useRef();
  const forumTags = useRef();
  const forumCategory = useRef();

  const forumCreator = async () => {
    dispatch({type:"LOADING"});
    const headers = {
      "x-access-token": token
    }
    const sendObject = {
      forumName: forumName.current.value,
      desc: forumDesc.current.value,
      tags: forumTags.current.value,
      category: forumCategory.current.value
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKENDPOINT}forums/forum`,sendObject,{validateStatus:()=>true,headers:headers});
      if(res.data.ok){
        dispatch({type:"NOT_LOADING"});
        notify(true,"Forum created Successfully");
        history.push(`/forum/${res.data.responseObject._id}`);
      }else{
        dispatch({type:"NOT_LOADING"});
        notify(false,"Something Went wrong");
      }
      
    } catch (error) {
      console.log(error);
      dispatch({type:"NOT_LOADING"});
      notify(false, "Network Error");
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    forumCreator();
  }

  const onError = (err) => {
    dispatch({ type: "NOT_LOADING" });
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    dispatch({ type: "NOT_LOADING" });
    const imagepath = res.filePath;
    setCoverPic(imagepath);
  };

  const onError1 = (err) => {
    dispatch({ type: "NOT_LOADING" });
    console.log("Error", err);
  };

  const onSuccess1 = (res) => {
    console.log("Success", res);
    dispatch({ type: "NOT_LOADING" });
    const imagepath = res.filePath;
    setDisplayPic(imagepath);
  };
  return (
    <>
      <Toaster />
      <Topbar source="forum" />
      <div className="ForumPage">
        <div className="ForumMainWrapper">
          <div className="ForumMain">
            <img
              src={process.env.REACT_APP_IMAGEKITURLENDPOINT+coverPicUrl}
              alt=""
              className="coverImg"
            />
            <div className="coverPicUploaddiv">
              <label htmlFor="coverpicupload">
              <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Upload new
              CoverPic</label>
            </div>
            <IKUpload
              id="coverpicupload"
              onError={onError}
              onSuccess={onSuccess}
              style={{ display: "none" }}
            />
            <div className="ProfileImg" style={{ backgroundColor: "white" }}>
              <img
                src={process.env.REACT_APP_IMAGEKITURLENDPOINT + displayPic}
                alt=""
              />
              <div className="DisplayPicUploaddiv">
                <label htmlFor="displaypicupload">
                <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Upload
                </label>
              </div>
              <IKUpload
                id="displaypicupload"
                onError={onError1}
                onSuccess={onSuccess1}
                style={{ display: "none" }}
              />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="ForumInfo">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="forumtitle" className="form-label">
                    Forum Title
                  </label><br></br>
                  <input
                    type="text"
                    className="forumtitleInput"
                    id="forumtitle"
                    placeholder="Forum Name"
                    ref={forumName}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="forumdesc" className="form-label">
                    Forum Description
                  </label><br></br>
                  <textarea
                    className="forumtitleInput"
                    id="forumdesc"
                    rows="3"
                    required
                    ref={forumDesc}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">
                    Add Tags
                  </label><br></br>
                  <input
                    type="text"
                    className="forumtitleInput"
                    id="tags"
                    placeholder="#tags.."
                    required
                    ref={forumTags}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="domain" className="form-label">
                    Domain
                  </label><br></br>
                  <input
                    type="text"
                    className="forumtitleInput"
                    id="domain"
                    placeholder="Information Technology"
                    required
                    ref={forumCategory}
                  />
                </div>
                <center><button type="submit" className="createforumButton">Create Forum</button></center>
              </form>
            </div>
            <br></br>
            <hr></hr>
          </div>
        </div>
        <div className="ForumRight">
          {<Sidebar source="user" contentObject="" />}
        </div>
      </div>
    </>
  );
}
