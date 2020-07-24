import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Bottom from "./Components/Bottom";
import Post from "./Pages/Post";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout";
import NewPost from "./Pages/NewPost";
import { useLoggedIn } from "./api/Auth";

export const AppRouter = () => {
  useLoggedIn()

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/post/:id" component={Post}></Route>
        <Route path="/newpost" component={NewPost}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/logout" component={Logout}></Route>
      </Switch>
      <Bottom />
    </Router>
  );
};
