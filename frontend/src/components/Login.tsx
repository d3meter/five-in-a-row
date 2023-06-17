import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import "./css/Login.css";

import { login } from "../services/auth";

interface LoginProps {
  playerNumber: number;
}

const Login: React.FC<LoginProps> = ({ playerNumber }) => {
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPlayerValid, setIsPlayerValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Check if player already logged in
  const checkLogPlayers = (playerNumber: number, email: string) => {
    if (playerNumber === 1) {
      const storedPlayerData = JSON.parse(
        localStorage.getItem("player2Data") || "{}"
      );
      if (storedPlayerData && storedPlayerData.email !== email) {
        setIsPlayerValid(true);
      }
    }
    if (playerNumber === 2) {
      const storedPlayerData = JSON.parse(
        localStorage.getItem("player1Data") || "{}"
      );
      if (storedPlayerData && storedPlayerData.email !== email) {
        setIsPlayerValid(true);
      }
    }
  };

  // After player check call login from auth with email, password and playerNumber
  const handleLog = async (event: FormEvent) => {
    event.preventDefault();
    const password = passwordRef.current?.value || "";
    checkLogPlayers(playerNumber, email);

    if (isPlayerValid) {
      try {
        await login(email, password, playerNumber);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Wrong email or password!");
      }
    } else {
      setErrorMessage("Email already logged in!");
    }
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
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
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
};

export default Login;
