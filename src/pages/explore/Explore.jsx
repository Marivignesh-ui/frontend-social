import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { notify } from "../../components/notify/notify";
import "./Explore.css";

function Explore() {
  const { user, token, dispatch } = useContext(AuthContext);
  const [forumList, setForumList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("general");

  const fetchForum = async (category) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKENDPOINT}forums/category?cat=${category}`,
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        console.log(res.data.responseObject);
        setForumList(res.data.responseObject);
      } else {
        notify(false, "Something went wrong!!");
      }
    } catch (error) {
      notify(false, "Network Error");
    }
  };

  useEffect(() => {
    console.log(currentCategory);
    fetchForum(currentCategory);
  }, [currentCategory]);

  const leaveForum = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    console.log(headers);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}forums/leave/${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "LEAVE_FORUM", payload: id });
        notify(true, "Left from forum");
      } else {
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      notify(false, "Network error");
    }
  };

  const joinForum = async (id) => {
    const headers = {
      "x-access-token": token,
    };
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKENDPOINT}forums/join/${id}`,
        "",
        { validateStatus: () => true, headers: headers }
      );
      if (res.data.ok) {
        dispatch({ type: "JOIN_FORUM", payload: id });
        notify(true, "Joined forum");
      } else {
        notify(false, "Something Went wrong");
      }
    } catch (error) {
      notify(false, "Network error");
    }
  };

  const handler = (event) => {
    console.log("selected value",event.target.value);
    setCurrentCategory(event.target.value);
  };
  return (
    <>
      <Toaster />
      <Topbar />
      <div className="ExploreWrapper">
        <div className="ExploreMain">
          <br></br>
          <br></br>
          <br></br>
          <p className="ForumListTitle">Forums List</p>
          <div className="searchFilters">
            <section>
              <span className="categspan">Category:</span>
              <select className="categselect" onChange={handler}>
                <option value={"general"}>General</option>
                <option value={"computer science"}>Computer Science</option>
                <option value={"Electronics and Communication"}>Electronics and Communication</option>
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
                    src={process.env.REACT_APP_IMAGEKITURLENDPOINT+forum.displayPicUrl}
                    alt=""
                  />
                  <div className="ExploreListInfo">
                    <div>
                      <p className="ExploreForumTitle">{forum.forumName}</p>
                      <p>{forum.members.length} Members</p>
                    </div>
                    {user.forumsJoined.includes(forum._id) ? (
                      <button onClick={() => leaveForum(forum._id)}>
                        Leave Forum
                      </button>
                    ) : (
                      <button onClick={() => joinForum(forum._id)}>
                        Join Forum
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
            <li className="ExploreListItem">
              <img
                className="ExploreListAvatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxAYV-wgGrMrsCtEaJ-2lsKXcvdx2tbL3CA&usqp=CAU"
                alt=""
              />
              <div className="ExploreListInfo">
                <div>
                  <p className="ExploreForumTitle">Programmers World</p>
                  <p>45 Members</p>
                </div>
                <button>Join Forum</button>
              </div>
            </li>
            <li className="ExploreListItem">
              <img
                className="ExploreListAvatar"
                src={
                  process.env.REACT_APP_IMAGEKITURLENDPOINT +
                  "/web-development_Ap6b_bSMM.jpeg"
                }
                alt=""
              />
              <div className="ExploreListInfo">
                <div>
                  <p className="ExploreForumTitle">Web dev Community</p>
                  <p>45 Members</p>
                </div>
                <button>Join Forum</button>
              </div>
            </li>
            <li className="ExploreListItem">
              <img
                className="ExploreListAvatar"
                src={
                  process.env.REACT_APP_IMAGEKITURLENDPOINT +
                  "/full-stack-web-developer_Bd2OUDJN9.png"
                }
                alt=""
              />
              <div className="ExploreListInfo">
                <div>
                  <p className="ExploreForumTitle">Full stack developers</p>
                  <p>45 Members</p>
                </div>
                <button className="">Join Forum</button>
              </div>
            </li>
          </ul>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Explore;
