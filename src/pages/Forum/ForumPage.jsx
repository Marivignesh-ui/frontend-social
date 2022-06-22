import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Fuheader from "../../components/fuheader/Fuheader";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { notify } from "../../components/notify/notify";
import axios from "axios";
import "./ForumPage.css";
import { Toaster } from "react-hot-toast";

function ForumPage() {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [forum, setForum] = useState(null);

  const fetchuser = async (id, headers) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKENDPOINT}forums/forum/${id}`,
        {validateStatus:() => true, headers:headers}
      );
      if (res.data.ok) {
        setForum(res.data.responseObject);
      } else {
        notify(false, "Error Occured While fetching user");
      }
    } catch (error) {
      notify(false, "Network Error");
    }
  };

  useEffect(() => {
    const headers = {
      "x-access-token": token,
    };

    fetchuser(id,headers);
  },[]);

  return (
    <>
      <Toaster /> 
      <Topbar source="forum" />
      <div className="ForumPage">
        <div className="ForumMainWrapper">
          {(forum !== null) && <Fuheader source="forum" contentObject={forum} />}
        </div>
        <div className="ForumRight">
          {(forum !== null) && <Sidebar source="forum" contentObject={forum}/>}
        </div>
      </div>
    </>
  );
}

export default ForumPage;
