import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { notify } from "../../components/notify/notify"

export default function Login() {
  const { isFetching, dispatch } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();

  const logincall = async (credential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credential,
        { validateStatus: () => true }
      );
      console.log(res.data);
      if (res.data.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.responseObject });
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
    if(isFetching) return;
    e.preventDefault();
    logincall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="LoginBody">
      <Toaster />
      <div className="AppTitle">Inter-Connect</div>
      <div className="login">
        <div className="LoginDiv">
          <span className="loginTitle">Login</span>
          <form className="loginForm" onSubmit={submitHandler}>
            <label>Email</label>
            <input
              className="loginInput"
              type="email"
              required
              placeholder="Enter your email..."
              ref={email}
            />
            <label>Password</label>
            <input
              className="loginInput"
              type="password"
              required
              placeholder="Enter your password..."
              ref={password}
            />
            <button type="submit" className={isFetching ? "loginButton loginButtonloading":"loginButton" }>
              Login
            </button>
          </form>
          <div className="MobRegisterButton">
            <span>Don&lsquo;t have an account&nbsp;&nbsp;</span>
            <Link to={"/register"}>Register</Link>
          </div>
        </div>
        <Link to={"/register"}>
          <button className="loginRegisterButton">Register</button>
        </Link>
      </div>
    </div>
  );
}
