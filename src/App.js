import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListData from "./components/pages/ListData";

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/'>
          <ListData />
        </Route>
      </div>
    </Router>
  );
}

export default App;
