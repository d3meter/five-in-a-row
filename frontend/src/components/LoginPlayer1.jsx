import React, { useState, useEffect } from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
import {
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { login } from "../admin/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function LoginPlayer1() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user1, setUser1] = useState(null);
  const [logState, setLogState] = useState("logged out");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user1) => {
      if (user1) {
        setLogState(`logged in`);
      } else {
        setLogState(`logged out`);
      }
    });
  }, []);

  const handleLog = (event) => {
    event.preventDefault();
    login(email, password).then((userData1) => setUser1(userData1));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
      <h5>Login</h5>
      {!!user1 ? (
        <p>Login successful with {user1.email} </p>
      ) : (
        <form>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth>
            <Button onClick={handleLog} color="secondary">
              Login
            </Button>
          </FormControl>
        </form>
      )}
    </div>
  );
}

export default LoginPlayer1;
