import { useEffect } from "react";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForumPage from "./pages/Forum/ForumPage";
import User from "./pages/User/User";

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  const currentUser = false;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          {currentUser ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{currentUser ? <Write /> : <Write />}</Route>
        <Route path="/settings">
          {currentUser ? <Settings /> : <Settings />}
        </Route>
        <Route path="/forum">
          {currentUser ? <ForumPage /> : <ForumPage />}
        </Route>
        <Route path="/user">{currentUser ? <User /> : <User />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
