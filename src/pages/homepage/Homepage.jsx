import { useLocation } from "react-router";
// import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
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
        <Posts />
        <Sidebar className="homeSidebar" />
      </div>
    </>
  );
}
