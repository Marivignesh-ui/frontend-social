import Fuheader from "../../components/Fuheader";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./ForumPage.css";

function ForumPage() {
  return (
    <>
      <Topbar source="forum" />
      <div className="ForumPage">
        <div className="ForumMainWrapper">
          <Fuheader />
        </div>
        <div className="ForumRight">
          <Sidebar source="forum" />
        </div>
      </div>
    </>
  );
}

export default ForumPage;