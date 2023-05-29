import React, { useState, useRef } from "react";
import "./css/Login.css";

function Login({ onLoginPlayer, errorMessage }) {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  // Call onLoginPlayer with email and password 
  const handleLog = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    onLoginPlayer(email, password);
  };

  // Show/hide password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="Login">
      <form className="row gap-2">
        <div className="form-group row w-100 m-0">
          <input
            type="email"
            className="form-control"
            id="inputEmail3"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group row w-100 m-0">
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
        <div className="form-group w-40 d-flex justify-content-center">
          <button onClick={handleLog} className="btn btn-success px-4">
            LOGIN
          </button>
        </div>
      </form>
      {errorMessage && (
        <p className="text-danger text-center py-2">{errorMessage}</p>
      )}
    </div>
  );
}

export default Login;
