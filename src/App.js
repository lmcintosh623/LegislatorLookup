import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Landing from "./components/pages/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Explore from "./components/pages/Explore";
import SignUp from "./components/pages/SignUp";
import Main from "./components/pages/Main";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/LegislatorLookup" exact component={Landing} />
        <Route path="/explore" component={Explore} />
        <Route path="/main" component={Main} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
