/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./topbar.css";
import SideBar from "../sidebar/Sidebar";

function RightMenu({ source }) {
  return (
    <>
      <SideBar source={source} />
    </>
  );
}
export default function Topbar({ source }) {
  const user = true;
  return (
    <div className="top">
      <div className="topLeft">
        <div className="Home">
          <Link className="link" to="/">
            <i className=" fas fa-home"></i>
          </Link>
        </div>
      </div>
      <div className="topCenter">
        <div className="AppTitle1">Inter-Connect</div>
      </div>
      <div className="topRight">
        <Link to={"/explore"}>
          <i className="fab fa-wpexplorer"></i>
          <p className="exploreLink">Explore</p>
        </Link>
        <div className="search">
          <input
            type={"search"}
            className="searchInput"
            placeholder="Search Something..."
          />
          <i className="topSearchIcon fas fa-search"></i>
        </div>
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
        <div className="mobRightMenu">
          <input type="checkbox" id="active" />
          <label htmlFor="active" className="menu-btn">
            <span></span>
          </label>
          <label htmlFor="active" className="close"></label>
          <div className="wrapper">
            <RightMenu className="rightMenu" source={source} />
          </div>
        </div>
      </div>
    </div>
  );
}
