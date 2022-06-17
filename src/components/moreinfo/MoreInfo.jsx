import axios from 'axios';
import { IKUpload } from 'imagekitio-react'
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./MoreInfo.css"


export default function MoreInfo({responseObject}) {
  const {dispatch} = useContext(AuthContext);
  const [InterestList,setInterestList] = useState(["Photography","Designing","Programming","Architect","Entrepreneurship","Information Technolgy","Medcicine","Software Development","Painting","Art"]);
  const [interestText,setInterestText] = useState(false);
  const [selectedList,setSelectedList] = useState([]);
  const username = useRef(responseObject.user.username);
  const occupation = useRef();
  const interest = useRef();
  const profilePicture = useRef("");

  const infoUpdater = async () => {
    const sendObject = {
      username : username.current.value,
      occupation : occupation.current.value,
      interests: selectedList,
      profilePicture: profilePicture.current.value
    }
    try{
      const resp = await axios.post("",sendObject);
    }catch(error){
      console.log(error);
    }
  }

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_SUCCESS", payload: responseObject });
  }

  const onError = (err) => {
    dispatch("NOT_LOADING");
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    dispatch("NOT_LOADING");
    const imagepath = res.filePath;
    profilePicture.current.value = imagepath;
  };

  return (
    <div>
        <div className="settingsWrapper glassEffect">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Some More Info</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={submitHandler}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={process.env.REACT_APP_IMAGEKITURLENDPOINT +"/no_avatar_TYi8DXgbZ.png"}
                alt=""
              />
              <label htmlFor="profileupload" onClick={()=>{dispatch("LOADING")}}>
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <IKUpload
                id="profileupload"
                onError={onError}
                onSuccess={onSuccess}
                style={{ display: "none" }}
                // className="settingsPPInput"
              />
            </div>
            <label>Username</label>
            <input type="text" placeholder="Marivignesh" name="name"  ref={username}/>
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
            <input type="password" placeholder="Iam a...." name="password" />
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
