import React from "react";
import "./css/Loader.css";

import loaderAnim from "../imgs/tic-tac-loader.gif";

function Loader() {
  return (
    <div className="Loader">
      <h1>Loading...</h1>
      <img src={loaderAnim} alt="loading..." />
    </div>
  );
}

export default Loader;
