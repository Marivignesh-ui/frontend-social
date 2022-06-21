import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./Explore.css";
import Loader from "../../components/loader/loader";
import ForumsExplorer from "../../components/forumstab/ForumsExplore";
import UsersExplorer from "../../components/userstab/UsersExplore";
import { Link } from "react-router-dom";

function Explore() {
  const { isFetching } = useContext(AuthContext);
  const [currentExplore, setCurrentExplore] = useState("forums")
  return (
    <>
      <Toaster />
      <Topbar />
      <div className="ExploreWrapper">
        {isFetching && <Loader />}
        <div className="ExploreMain">
          <br></br>
          <br></br>
          <br></br>
          <p className="ForumListTitle">Explore</p>
          <div className="tabholder">
            <button onClick={()=>{setCurrentExplore("forums")}} className={(currentExplore === "forums") ? "tabButton selectedTab" : "tabButton"}>Forums</button>
            <button onClick={()=>{setCurrentExplore("users")}} className={(currentExplore === "forums") ? "tabButton" : "tabButton selectedTab"}>Users</button>
            <Link to="/createForum" ><button className="createForumButton" style={{position: "absolute", right:"5px",bottom:"5px"}}>Create Forum</button></Link>
          </div>
          {
            (currentExplore === "forums") ? <ForumsExplorer /> : (<UsersExplorer />)
          }
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Explore;
