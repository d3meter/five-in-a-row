import React, { useState, useEffect, useRef } from "react";
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

function LoginPlayer2({user2, onLoginPlayer2, onLogoutPlayer2}) {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleLogout = () => {
    onLogoutPlayer2();
  };

  const handleLog = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    onLoginPlayer2(email, password);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
      <h5>Login</h5>
      {!!user2 ? (
        <form>
          <p>Login successful with {user2.email} </p>
          <FormControl fullWidth>
            <Button onClick={() => handleLogout("user1")}>Logout</Button>
          </FormControl>
        </form>
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
              inputRef={passwordRef}
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

export default LoginPlayer2;
