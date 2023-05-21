import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
