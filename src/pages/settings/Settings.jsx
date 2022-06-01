import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Settings() {
  return (
    <>
      <Topbar />
      <br></br>
      <br></br>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Update Your Account</span>
            <span className="settingsTitleDelete">Delete Account</span>
          </div>
          <form className="settingsForm">
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>{" "}
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
              />
            </div>
            <label>Username</label>
            <input type="text" placeholder="Safak" name="name" />
            <label>Email</label>
            <input type="email" placeholder="safak@gmail.com" name="email" />
            <label>Password</label>
            <input type="password" placeholder="Password" name="password" />
            <label>Your Interests</label>
            <div className="InterestsWrapper">
              <ul className="InterestList">
                <li>Photography</li>
                <li>Designing</li>
                <li>Programming</li>
                <li>Architect</li>
                <li>Entrepreneurship</li>
                <li>Information Technolgy</li>
                <li>Medcicine</li>
                <li>
                  <button className="Interestadd" type="button">
                    <i className="fas fa-plus-circle"></i>
                  </button>
                </li>
              </ul>
            </div>
            <button className="settingsSubmitButton" type="submit">
              Update
            </button>
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
