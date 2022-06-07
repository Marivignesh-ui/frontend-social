import "./User.css";
import {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Fuheader from "../../components/fuheader/Fuheader";
import Chat from "../../components/chat/Chat";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { notify } from "../../components/notify/notify";

export default function User() {
  const { id } = useParams();
  const {token,user} = useContext(AuthContext);
  const [correspondingUser,setCorrespondingUser]  = useState(null);
  const [currentchat,setCurrentChat] = useState(null);

  const fetchuser = async (id,headers) => {
    console.log("called fetchuser");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKENDPOINT}users/user/${id}`,
        { headers: headers }
      );
      console.log(res.data);
      if (res.data.ok) {
        setCorrespondingUser(res.data.responseObject);
      } else {
        notify(false, "Error Occured While fetching user");
      }
    } catch (error) {
      notify(false, "Network Error");
    }
  };

  const fetchConversation = async () => {
    console.log("called fetch conversation");
    try {
      const res = await axios.get( `${process.env.REACT_APP_BACKENDPOINT}conversations/find/${user._id}/${id}`);
      console.log(res.data);
      if(res.data.ok){
        setCurrentChat(res.data.responseObject);
      }else {
        notify(false, "Error Occured While fetching conversation");
      } 
    } catch (error) {
      notify(false, "Network Error");
    }
  }
  
  useEffect(() => {
      const headers = {
        "x-access-token": token,
      };

      fetchuser(id,headers);
      fetchConversation();
  },[]);

  return (
    <>
      <Topbar />
      <div className="userPage">
        <div className="userMainWrapper">
          {
            (correspondingUser!==null) && <Fuheader source="user" contentObject={correspondingUser}/>
          }
        </div>
        <div className="chatWrapper">
          {
            (currentchat!==null) && <Chat conversationId={currentchat._id} otheruser={correspondingUser}/>
          }
        </div>
      </div>
    </>
  );
}
