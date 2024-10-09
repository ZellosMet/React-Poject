import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes.jsx";

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
