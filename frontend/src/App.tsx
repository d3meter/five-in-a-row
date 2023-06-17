import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Game from "./pages/Game";

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Loading animation with timeout when app starts or refreshes
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main isLoading={isLoading} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;