import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
// import Landing from "./components/pages/Landing";
import Documentation from "./components/pages/Documentation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LegExplore from "./components/pages/LegExplore";
import BillExplore from "./components/pages/BillExplore";
import SignUp from "./components/pages/SignUp";
import About from "./components/pages/About";
import Main from "./components/pages/Main";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/exploreleg" component={LegExplore} />
        <Route path="/explorebill" component={BillExplore} />
        <Route path="/LegislatorLookup" component={Main} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/about" component={About} />
        <Route path="/docs" exact component={Documentation} />
      </Switch>
    </Router>
  );
}

export default App;
