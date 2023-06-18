import React from "react";
import "./css/Loader.css";

import loaderAnim from "../imgs/tic-tac-loader.gif";

const Loader: React.FC = () => {
  return (
    <div className="Loader">
      <h1>Loading...</h1>
      <img src={loaderAnim} alt="loading..." />
    </div>
  );
}

export default Loader;