/* eslint-disable no-undef */
import "./User.css";
import Topbar from "../../components/topbar/Topbar";
import Fuheader from "../../components/fuheader/Fuheader";
import Chat from "../../components/chat/Chat";

export default function User() {
  return (
    <>
      <Topbar />
      <div className="userPage">
        <div className="userMainWrapper">
          <Fuheader source="user" />
        </div>
        <div className="chatWrapper">
          <Chat />
        </div>
      </div>
    </>
  );
}
