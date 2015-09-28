import React from "react";
import HashHistory from "react-router/lib/HashHistory";
import { Router, Route, Redirect } from "react-router";
import App from "./views/App";
import Login from "./views/Login";
import Shim from "./views/RouterLoginShim";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Settings from "./views/Settings";
import LoggedInShim from "./views/LoggedInShim"; //TODO does this have to be a React component?

React.render((
  <Router history={new HashHistory()}>
    <Route path="/" component={App} onEnter={App.onEnter}>
      <Route name="login" path="login" title="Login" component={Login} />
      <Route name="signup" path="signup" title="Sign up" component={Signup} />
      <Route name="loggedin" path="loggedin/:token" component={LoggedInShim} />
      <Route name="shim" path="shim" component={Shim} />
      <Route name="home" path="home" title="Welcome" component={Home} onEnter={Home.onEnter} hideSubHeader/>
      <Route name="settings" path="settings" title="Settings" component={Settings} onEnter={Settings.onEnter}/>
    </Route>
  </Router>
), document.getElementById("app"));
