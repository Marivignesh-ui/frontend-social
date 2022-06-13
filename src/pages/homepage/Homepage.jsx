import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { notify } from "../../components/notify/notify";
// import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import PostUploader from "../../components/postuploader/PostUploader";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./homepage.css";

export default function Homepage() {
  const [postList, setPostList] = useState([]);
  const { user, token } = useContext(AuthContext);
  useEffect(() => {
    const headers = {
      "x-access-token": token,
    };
    const fetchPosts = async () => {
      try {
        if(user.followings.length === 0 && user.forumsJoined.length === 0){
          return;
        }
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDPOINT}post/home`,
          { validateStatus: () => true, headers: headers }
        );
        if (res.data.ok) {
          setPostList(res.data.responseObject);
        } else {
          notify(false, "Something went wrong");
        }
      } catch (error) {
        notify(false, "Network Error");
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <>
      <Topbar />
      {/* <Header /> */}
      <div className="home">
        <div className="homemain">
          <br></br>
          <br></br>
          <PostUploader />
          {postList.length !== 0 ? (
            <Posts postList={postList} />
          ) : (
            <div className="NoPostDiv">Follow Somone or Join in a Forum to see posts</div>
          )}
        </div>
        <Sidebar className="homeSidebar" />
      </div>
    </>
  );
}
