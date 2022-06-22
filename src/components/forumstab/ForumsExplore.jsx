import {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import { notify } from "../../components/notify/notify";
import axios from "axios";

export default function ForumsExplorer() {
  const { user, token, dispatch } = useContext(AuthContext);
  const [forumList, setForumList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("general");

  const fetchForum = async (category) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.get(
        `${process.env.REACT_APP_BACKENDPOINT}forums/category?cat=${category}`,
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "NOT_LOADING" });
        setForumList(res.data.responseObject);
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
    fetchForum(currentCategory);
  }, [currentCategory]);

  const leaveForum = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}forums/leave/${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "LEAVE_FORUM", payload: id });
        dispatch({ type: "NOT_LOADING" });
        notify(true, "Left from forum");
      } else {
        dispatch({ type: "NOT_LOADING" });
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      dispatch({ type: "NOT_LOADING" });
      notify(false, "Network error");
    }
  };

  const joinForum = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}forums/join/${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "JOIN_FORUM", payload: id });
        dispatch({ type: "NOT_LOADING" });
        notify(true, "Joined forum");
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
            <option value={"computer science"}>Computer Science</option>
            <option value={"Electronics and Communication"}>
              Electronics and Communication
            </option>
            <option value={"Arts And Science"}>Arts And Science</option>
            <option value={"Agriculture"}>Agriculture</option>
            <option value={"computer engineering"}>Computer Engineering</option>
          </select>
        </section>
        <div className="ForumSearch">
          <input
            type={"search"}
            className="searchInput"
            placeholder="Search Forums..."
          />
          <i className="topSearchIcon fas fa-search"></i>
        </div>
      </div>
      <ul className="ExploreList">
        {forumList.map((forum) => {
          return (
            <li className="ExploreListItem" key={forum._id}>
              <img
                className="ExploreListAvatar"
                src={
                  process.env.REACT_APP_IMAGEKITURLENDPOINT +
                  forum.displayPicUrl
                }
                alt=""
              />
              <div className="ExploreListInfo">
                <div>
                  <p className="ExploreForumTitle">{forum.forumName}</p>
                  <p>{forum.members.length} Members</p>
                </div>
                {user.forumsJoined.includes(forum._id) ? (
                  <button onClick={() => leaveForum(forum._id)} className="createForumButton">
                    Leave Forum
                  </button>
                ) : (
                  <button onClick={() => joinForum(forum._id)} className="createForumButton">
                    Join Forum
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
