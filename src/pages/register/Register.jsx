import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import { notify } from "../../components/notify/notify";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Loader from "../../components/loader/loader";
import MoreInfo from "../../components/moreinfo/MoreInfo";

export default function Register() {
  const { isFetching, dispatch } = useContext(AuthContext);
  const [collectInfo, setCollectInfo] = useState(null);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cnfPassword = useRef();

  const registerUser = async () => {
    const sendObject = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKENDPOINT}auth/register`,
        sendObject,
        { ValidateState: () => true }
      );
      if (res.data.ok) {
        setCollectInfo(res.data.resposeObject);
        notify(true, res.data.message);
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
        notify(false, res.data.message);
        console.log("Login Failure");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
      notify(false, "Network Error");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.current.value !== cnfPassword.current.value) {
      notify(false, "passwords doesn't match");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    registerUser();

    console.log("called");
  };
  return (
    <div className="RegisterBody">
      <div className="AppTitle">Inter-Connect</div>
      <Toaster />
      {isFetching && <Loader />}
      {
        collectInfo && <>
      <br></br>
      <br></br>
        </>
      }
      <div className="register">
        <div className="mainDiv">
          {collectInfo ? (
            <>
            <MoreInfo />
            </>
          ) : (
            <>
              <div className="quotesDivWrapper">
                <div className="quotesDiv">
                  <span className="quote">Grow in Your</span>
                  <br></br>
                  <span className="quote1">Career along</span>
                  <br></br>
                  <span className="quote2">with others</span>
                </div>
              </div>
              <div className="registerDiv">
                <span className="registerTitle">Register</span>
                <form className="registerForm" onSubmit={submitHandler}>
                  <label>Username</label>
                  <input
                    className="registerInput"
                    type="text"
                    minLength={6}
                    required
                    placeholder="Enter your username..."
                    ref={username}
                  />
                  <label>Email</label>
                  <input
                    className="registerInput"
                    type="email"
                    required
                    placeholder="Enter your email..."
                    ref={email}
                  />
                  <label>Password</label>
                  <input
                    className="registerInput"
                    type="password"
                    required
                    placeholder="Enter your password..."
                    ref={password}
                  />
                  <label>Confirm Password</label>
                  <input
                    className="registerInput"
                    type="password"
                    required
                    placeholder="Re-Type your password..."
                    ref={cnfPassword}
                  />
                  <button
                    className={
                      isFetching
                        ? "registerButton registerButtonloading"
                        : "registerButton"
                    }
                    type="submit"
                  >
                    Register
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
        <Link to={"/login"}>
          <button className="registerLoginButton">Login</button>
        </Link>
      </div>
    </div>
  );
}
