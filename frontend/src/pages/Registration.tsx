import React, { useState, useRef } from "react";
import "./css/Registration.css";

import { useNavigate } from "react-router-dom";
import { registration } from "../services/auth";
import miniLoader from "../imgs/miniloader.gif";

const Registration: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [finished, setFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Registration with forwarding to the home page and error handling
  const handleReg = async () => {
    const password = passwordRef.current?.value;
    if (email && password) {
      try {
        await registration(email, password);
        setFinished(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        setErrorMessage("Email already in use!");
      }
    }
  };

  // Show/hide password
  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  // Show/hide password confirm
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  // Check inputs with error handling before submit
  const checkData = () => {
    if (passwordRef.current?.value.length! < 6) {
      setErrorMessage("Password must be at least 6 characters!");
    } else if (
      passwordRef.current?.value !== passwordConfirmRef.current?.value
    ) {
      setErrorMessage("Passwords must match!");
    } else if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Invalid email format!");
    } else {
      handleReg();
    }
  };

  // Submit with calling check data
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkData();
  };

  return (
    <div className="Registration">
      <div className="container d-flex flex-column align-items-center">
        <div className="col text-center">
          <h2 className="text-center">Registration</h2>
          <span>We will only need your email and a password.</span>
        </div>
        {!finished ? (
          <div className="col-sm-6">
            <hr />
            <form className="row gap-2 m-0" onSubmit={handleFormSubmit}>
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
                    id="inputPassword"
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
              <div className="form-group row w-100 m-0">
                <div className="input-group p-0">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    ref={passwordConfirmRef}
                    className="form-control"
                    id="inputPasswordConf"
                    placeholder="Password confirm"
                  />
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={handleClickShowPasswordConfirm}
                  >
                    show
                  </button>
                </div>
              </div>
              <div className="form-group w-40 d-flex justify-content-center">
                <button
                  onClick={checkData}
                  className="btn btn-success px-4"
                  type="submit"
                >
                  REGISTRATION
                </button>
              </div>
              <p
                className="text-danger text-center py-2"
                style={{ display: errorMessage ? "block" : "none" }}
              >
                {errorMessage}
              </p>
            </form>
          </div>
        ) : (
          <>
            <h3>Great, your account has been created!</h3>
            <div className="loader-container">
              <img className="mini-loader" src={miniLoader} alt="loading..." />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Registration;
