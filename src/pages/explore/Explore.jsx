import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./Explore.css";

function Explore() {
  return (
    <>
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
              <select className="categselect">
                <option>General</option>
                <option>Computer Science</option>
                <option>Electronics and Communication</option>
                <option>Arts And Science</option>
                <option>Agriculture</option>
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
                src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/web-development_Ap6b_bSMM.jpeg"}
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
                src={process.env.REACT_APP_IMAGEKITURLENDPOINT+"/full-stack-web-developer_Bd2OUDJN9.png"}
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
