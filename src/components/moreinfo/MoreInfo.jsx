import axios from 'axios';
import { IKUpload } from 'imagekitio-react'
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { notify } from '../notify/notify';
import "./MoreInfo.css"


export default function MoreInfo({responseObject}) {
  const {dispatch} = useContext(AuthContext);
  const [InterestList,setInterestList] = useState(["Photography","Designing","Programming","Architect","Entrepreneurship","Information Technolgy","Medcicine","Software Development","Painting","Art"]);
  const [interestText,setInterestText] = useState(false);
  const [selectedList,setSelectedList] = useState([]);
  const [profilePicture,setProfilePicture] = useState(responseObject.profilePicture);
  const occupation = useRef();
  const interest = useRef();
  const description = useRef("");

  const infoUpdater = async () => {
    dispatch({type:"LOADING"});
    const sendObject = {
      id: responseObject.user._id,
      desc: description.current.value,
      occupation : occupation.current.value,
      interests: selectedList,
      profilePicture: profilePicture
    }
    const headers = {
      "x-access-token": responseObject.token
    }
    if(selectedList.length===0){
      sendObject.interests=null;
    }
    if(occupation.current.value===null || occupation.current.value === undefined || occupation.current.value === ""){
      sendObject.occupation = null
    }
    if(profilePicture===null || profilePicture === undefined || profilePicture === ""){
      sendObject.profilePicture = null
    }
    if(description.current.value===null || description.current.value === undefined || description.current.value === ""){
      sendObject.description = null
    }
    try{
      const res = await axios.put(`${process.env.REACT_APP_BACKENDPOINT}users/update/user`,sendObject,{validateStatus: ()=> true,headers:headers});
      const resObject = {
        token: responseObject.token,
        user: res.data.responseObject
      }
      if(res.data.ok){
        dispatch({type:"LOGIN_SUCCESS",payload: resObject});
        dispatch({type:"NOT_LOADING"});
        notify(true,"User Registered Successfully");
      }else{
        dispatch({type: "NOT_LOADING"});
        notify(false,"Something Went Wrong");
      }
    }catch(error){
      dispatch({type: "NOT_LOADING"});
      console.log(error);
      notify(false,"Network Error");
    }
  }

  const submitHandler1 = (e) => {
      e.preventDefault();
      infoUpdater();
  }

  const onError = (err) => {
    dispatch({type:"NOT_LOADING"});
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    dispatch({type:"NOT_LOADING"});
    const imagepath = res.filePath;
    setProfilePicture(imagepath);
  };

  return (
    <div>
        <div className="settingsWrapper glassEffect">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Some More Info</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={submitHandler1}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={(profilePicture.current.value)?process.env.REACT_APP_IMAGEKITURLENDPOINT +profilePicture.current.value:process.env.REACT_APP_IMAGEKITURLENDPOINT +"/no_avatar_TYi8DXgbZ.png"}
                alt=""
              />
              <label htmlFor="profileupload">
                <i className="settingsPPIcon far fa-user-circle" onClick={()=>{dispatch({type:"LOADING"})}}></i>{" "}
              </label>
              <IKUpload
                id="profileupload"
                onError={onError}
                onSuccess={onSuccess}
                style={{ display: "none" }}
              />
            </div>
            <label>Current Role</label>
            <input type="text" placeholder="Student" name="occupation" list="occupation" ref={occupation}/>
            <datalist id="occupation">
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Software Developer">Software Developer</option>
                <option value="HR">HR</option>
                <option value="Engineer">Engineer</option>
                <option value="Teacher">Teacher</option>
                <option value="Digital Marketing Manager">Digital Marketing</option>
                <option value="Architect">Architect</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Test Engineer">Test Engineer</option>
                <option value="Medical Researcher">Medical Researcher</option>
                <option value="Designer">Designer</option>
            </datalist>
            <label>Short Description About You</label>
            <input type="text" placeholder="Iam a...." name="description" ref={description}/>
            <label>Your Interests</label>
            <div className="InterestsWrapper">
              <ul className="InterestList">
                {InterestList.map((interest)=>{
                  return (
                    <li onClick={()=>{setSelectedList(selectedList.concat(interest));}} style={{backgroundColor: (selectedList.includes(interest))&&"rgb(1, 114, 114)"}}>{interest}</li>
                    )
                  })}
                {interestText && <li><input type="text" ref={interest}/><button type='button' onClick={()=>{setInterestList(InterestList.concat(interest.current.value))}}>add</button></li>}
                <li>
                  <button className="Interestadd" type="button" onClick={()=>{setInterestText(!interestText)}}>
                    <i className="fas fa-plus-circle"></i>
                  </button>
                </li>
              </ul>
              
            </div>
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          </form>
        </div>
    </div>
  )
}
