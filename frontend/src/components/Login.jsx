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

function Login({ onLoginPlayer }) {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleLog = (event) => {
    event.preventDefault();
    const password = passwordRef.current.value;
    onLoginPlayer(email, password);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Login">
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
    </div>
  );
}

export default Login;
