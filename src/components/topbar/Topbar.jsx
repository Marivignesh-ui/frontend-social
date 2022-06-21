/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./topbar.css";
import SideBar from "../sidebar/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function RightMenu({ source }) {
  return (
    <>
      <SideBar source={source} />
    </>
  );
}
export default function Topbar({ source }) {
  const {user,token,dispatch} = useContext(AuthContext);

  const logout = () => {
    console.log("clicked Logout");
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }

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
          <Link to="/explore" style={{ textDecoration: "none", color: "inherit" }}><i className="topSearchIcon fas fa-search"></i></Link>
        </div>
        {token ? (
          <>
            <Link className="link" to="/settings">
              <img
                className="topImg"
                src={`${user && user.profilePicture ? process.env.REACT_APP_IMAGEKITURLENDPOINT+user.profilePicture : process.env.REACT_APP_IMAGEKITURLENDPOINT+"/no_avatar_TYi8DXgbZ.png"}`}
                alt=""
              />
            </Link>
            <div className="tooltip" onClick={logout}>
              <i className="fas fa-sign-out-alt" style={{ color: "white" }}></i>
              <span className="tooltiptext">logout</span>
            </div>
          </>
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
