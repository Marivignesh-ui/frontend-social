import { useLocation } from "react-router";
// import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import PostUploader from "../../components/postuploader/PostUploader";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./homepage.css";

export default function Homepage() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Topbar />
      {/* <Header /> */}
      <div className="home">
        <div className="homemain">
          <br></br>
          <br></br>
          <PostUploader />
          <Posts />
        </div>
        <Sidebar className="homeSidebar" />
      </div>
    </>
  );
}
