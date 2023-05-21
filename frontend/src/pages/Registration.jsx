import React, { useState } from "react";
import "./css/Registration.css";
import { Link } from "react-router-dom";
import {
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  Button
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { registration } from "../admin/auth";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswordConfrim, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [finished, setFinished] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleReg = () => {
    registration(email, password).then(setFinished(true));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const checkData = () => {
    email.includes("@") &&
    email.includes(".") &&
    password.length > 5 &&
    password === passwordConfirm
      ? handleReg()
      : setShowErrorDialog(true);
  };

  return (
    <div className="Registration">
      <h1>Registration</h1>
      <h2>Please add your email and a password here.</h2>
      {!finished ? (
        <form>
          <FormControl sx={{ m: 1, width: "30ch" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "30ch" }}>
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
          <FormControl sx={{ m: 1, width: "30ch" }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPasswordConfrim ? "text" : "password"}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPasswordConfirm}
                    edge="end"
                  >
                    {showPasswordConfrim ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm password"
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "30ch" }}>
            <Button onClick={checkData} variant="outlined">
              Registration
            </Button>
          </FormControl>
          <p className="error-text" style={{ display: showErrorDialog ? "block" : "none" }}>Wrong email or password! <br /> Password must be at least 6 characters!</p>
        </form>
      ) : (
        <>
          <p>Registration successful</p>
          <Link to="/">
            <Button>
              <span class="material-icons">arrow_back_ios</span>
              <p>Back to the home page</p>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Registration;
