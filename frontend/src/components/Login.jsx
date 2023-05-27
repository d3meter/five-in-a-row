import React, { useState, useRef } from "react";
import "./css/Login.css";
import miniLoader from "../imgs/miniloader.gif";

function Login({ onLoginPlayer }) {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);

  const handleLog = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    onLoginPlayer(email, password);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="Login">
      {isLoading ? (
        <div className="loader-container">
          <img className="mini-loader" src={miniLoader} alt="loading..." />
        </div>
      ) : (
        <form>
          <div className="form-group row w-100">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group row w-100">
            <div className="input-group p-0">
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                className="form-control"
                id="inputPassword3"
                placeholder="Password"
              />
              <button
                className="btn btn-light"
                type="button"
                onClick={handleClickShowPassword}
              >
                show
              </button>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button onClick={handleLog} className="btn btn-success px-4">
                LOGIN
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
