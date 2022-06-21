import {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import { notify } from "../../components/notify/notify";
import axios from "axios";

export default function UsersExplorer() {
  const { user, token, dispatch } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("general");

  const fetchUsers = async (category) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.get(
        `${process.env.REACT_APP_BACKENDPOINT}users/category?cat=${category}`,
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "NOT_LOADING" });
        console.log(res.data.responseObject);
        setUserList(res.data.responseObject);
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something went wrong!!");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
      notify(false, "Network Error");
    }
  };

  useEffect(() => {
    console.log(currentCategory);
    fetchUsers(currentCategory);
  }, [currentCategory]);

  const unFollowUser = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    console.log(headers);
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}users/unfollow?id=${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "UNFOLLOW", payload: id });
        dispatch({ type: "NOT_LOADING" });
        notify(true, "Unfollowed User");
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
      notify(false, "Network error");
    }
  };

  const followUser = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}users/follow?id=${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "FOLLOW", payload: id });
        dispatch({ type: "NOT_LOADING" });
        notify(true, "Followed User");
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
      notify(false, "Network error");
    }
  };

  const handler = (event) => {
    console.log("selected value", event.target.value);
    setCurrentCategory(event.target.value);
  };
  return (
    <div style={{ boxShadow: "2px -1px 7px -1px rgb(0 0 0 / 75%)", paddingRight: "2rem"}}>
      <br></br>
      <br></br>
      <div className="searchFilters">
        <section>
          <span className="categspan">Category:</span>
          <select className="categselect" onChange={handler}>
                <option value={"general"}>General</option>
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
          </select>
        </section>
        <div className="ForumSearch">
          <input
            type={"search"}
            className="searchInput"
            placeholder="Search User..."
          />
          <i className="topSearchIcon fas fa-search"></i>
        </div>
      </div>
      <ul className="ExploreList">
        {userList.map((otheruser) => {
          return (
            <li className="ExploreListItem" key={otheruser._id}>
              <img
                className="ExploreListAvatar"
                src={
                  process.env.REACT_APP_IMAGEKITURLENDPOINT +
                  otheruser.profilePicture
                }
                alt=""
              />
              <div className="ExploreListInfo">
                <div>
                  <p className="ExploreForumTitle">{otheruser.username}</p>
                  <p>{otheruser.occupation}</p>
                </div>
                {user.followings.includes(otheruser._id) ? (
                  <button onClick={() => unFollowUser(otheruser._id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => followUser(otheruser._id)}>
                    Follow
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}