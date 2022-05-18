import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("called");
  };
  return (
    <div className="RegisterBody">
      <div className="AppTitle">Inter-Connect</div>
      <div className="register">
        <div className="mainDiv">
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
              />
              <label>Email</label>
              <input
                className="registerInput"
                type="email"
                required
                placeholder="Enter your email..."
              />
              <label>Password</label>
              <input
                className="registerInput"
                type="password"
                required
                placeholder="Enter your password..."
              />
              <label>Confirm Password</label>
              <input
                className="registerInput"
                type="password"
                required
                placeholder="Re-Type your password..."
              />
              <button className="registerButton" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
        <Link to={"/login"}>
          <button className="registerLoginButton">Login</button>
        </Link>
      </div>
    </div>
  );
}
