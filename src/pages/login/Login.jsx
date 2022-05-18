import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("called");
  };

  return (
    <div className="LoginBody">
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
            />
            <label>Password</label>
            <input
              className="loginInput"
              type="password"
              required
              placeholder="Enter your password..."
            />
            <button type="submit" className="loginButton">
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
