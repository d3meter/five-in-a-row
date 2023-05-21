import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Game from "./pages/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
