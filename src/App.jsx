import { useEffect, useContext } from "react";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForumPage from "./pages/Forum/ForumPage";
import User from "./pages/User/User";
import Explore from "./pages/explore/Explore";
import { AuthContext } from "./context/AuthContext";
import { Redirect } from "react-router-dom";
import {ContextProvider} from "./context/SocketContext";
import {VideoPlayer} from "./pages/videoplayer/VideoPlayer";
import {Notifications} from "./pages/videoplayer/Notifications";
import {Options} from "./pages/videoplayer/OptionsComponent";

const Videocaller=()=>{
  return(
      <ContextProvider>
          <VideoPlayer />
          <Options>
              <Notifications />
          </Options>
      </ContextProvider>
  );
}

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {token ? <Homepage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          {token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login">{token ? <Redirect to="/" /> : <Login />}</Route>
        <Route path={"/explore"}>
          {token ? <Explore /> : <Redirect to="/login" />}
        </Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{token ? <Write /> : <Write />}</Route>
        <Route path="/settings">{token ? <Settings /> : <Settings />}</Route>
        <Route path="/forum/:id">
          {token ? <ForumPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/user/:id">
          {token ? <User /> : <Redirect to="/login" />}
        </Route>
        <Route path="/singleBlog/:id">
          {token ? <Single /> : <Redirect to="/login" />}
        </Route>
        <Route path="/mockInterview">
          {token ? <Videocaller /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
