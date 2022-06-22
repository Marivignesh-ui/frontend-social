import "./settings.css";
import { useContext, useState, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { notify } from "../../components/notify/notify";
import { IKUpload } from "imagekitio-react";
import { AuthContext } from "../../context/AuthContext";

export default function Settings() {
  const { dispatch, user, token } = useContext(AuthContext);

  const [InterestList, setInterestList] = useState([
    "Photography",
    "Designing",
    "Programming",
    "Architect",
    "Entrepreneurship",
    "Information Technolgy",
    "Medcicine",
    "Software Development",
    "Painting",
    "Art",
  ]);
  const [interestText, setInterestText] = useState(false);
  const [selectedList, setSelectedList] = useState(user.interests);
  const [profilePicture,setProfilePicture] = useState(user.profilePicture);
  const occupation = useRef();
  const interest = useRef();
  const username = useRef();
  const description = useRef("");

  const infoUpdater = async () => {
    console.log("CAlled Infoupdater unncessarily");
    dispatch({ type: "LOADING" });
    const sendObject = {
      id: user._id,
      username: username.current.value,
      desc: description.current.value,
      occupation: occupation.current.value,
      interests: selectedList,
      profilePicture: profilePicture,
    };
    const headers = {
      "x-access-token": token,
    };
    if (selectedList.length === 0) {
      sendObject.interests = null;
    }
    if (
      username.current.value === null ||
      username.current.value === undefined ||
      username.current.value === ""
    ) {
      sendObject.username = null;
    }
    if (
      occupation.current.value === null ||
      occupation.current.value === undefined ||
      occupation.current.value === ""
    ) {
      sendObject.occupation = null;
    }
    if (
      description.current.value === null ||
      description.current.value === undefined ||
      description.current.value === ""
    ) {
      sendObject.desc = null;
    }
    if (
      profilePicture === null ||
      profilePicture === undefined ||
      profilePicture === ""
    ) {
      sendObject.profilePicture = null;
    }
    
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}users/update/user`,
        sendObject,
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "NOT_LOADING" });
        notify(true, "User Updated Successfully");
        dispatch({ type: "UPDATE_USER", payload: res.data.responseObject });
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something Went Wrong");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
      console.log(error);
      notify(false, "Network Error");
    }
    console.log("Sendobjects:",sendObject);
  };
  const submitHandler1 = (e) => {
    e.preventDefault();
    infoUpdater();
  };

  const onError = (err) => {
    dispatch({ type: "NOT_LOADING" });
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    dispatch({ type: "NOT_LOADING" });
    const imagepath = res.filePath;
    setProfilePicture(imagepath);
  };
  return (
    <>
      <Topbar />
      <br></br>
      <br></br>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={submitHandler1}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={process.env.REACT_APP_IMAGEKITURLENDPOINT+profilePicture}
                alt=""
              />
              <label htmlFor="profileupload" onClick={() => {
                    dispatch({type:"LOADING"});
                  }}>
                <i
                  className="settingsPPIcon far fa-user-circle"
                ></i>{" "}
              </label>
              <IKUpload
                id="profileupload"
                onError={onError}
                onSuccess={onSuccess}
                style={{ display: "none" }}
                onChange={() => {
                  dispatch({type:"LOADING"});
                }}
                // className="settingsPPInput"
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user?.username}
              name="name"
              ref={username}
            />
            <label>Current Role</label>
            <input
              type="text"
              placeholder={user?.occupation}
              name="occupation"
              list="occupation"
              ref={occupation}
            />
            <datalist id="occupation">
              <option value="Student">Student</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Software Developer">Software Developer</option>
              <option value="HR">HR</option>
              <option value="Engineer">Engineer</option>
              <option value="Teacher">Teacher</option>
              <option value="Digital Marketing Manager">
                Digital Marketing
              </option>
              <option value="Architect">Architect</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Test Engineer">Test Engineer</option>
              <option value="Medical Researcher">Medical Researcher</option>
              <option value="Designer">Designer</option>
            </datalist>
            <label>Short Description About You</label>
            <input
              type="text"
              placeholder={user?.desc}
              name="description"
              ref={description}
            />
            <label>Your Interests</label>
            <div className="InterestsWrapper">
              <ul className="InterestList">
                {InterestList.map((interest) => {
                  return (
                    <li
                      onClick={() => {
                        setSelectedList(selectedList.concat(interest));
                      }}
                      style={{
                        backgroundColor:
                          selectedList.includes(interest) && "rgb(1, 114, 114)",
                      }}
                    >
                      {interest}
                    </li>
                  );
                })}
                {interestText && (
                  <li>
                    <input type="text" ref={interest} />
                    <button
                      type="button"
                      onClick={() => {
                        setInterestList(
                          InterestList.concat(interest.current.value)
                        );
                      }}
                    >
                      add
                    </button>
                  </li>
                )}
                <li>
                  <button
                    className="Interestadd"
                    type="button"
                    onClick={() => {
                      setInterestText(!interestText);
                    }}
                  >
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
        <Sidebar />
      </div>
    </>
  );
}
