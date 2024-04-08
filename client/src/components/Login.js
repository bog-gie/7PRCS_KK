import "../css/Register.css";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="form-container mt-5 w-11/12 sm:w-2/3">
      <form className="form container">
        <div className="error-msg" id="errorMessage">
        <p className="text-danger fs-6">{message ? message : null}</p>
        </div>
        <div className="input-group mt-3">
          <input
            type="text"
            className="input-control focus:ring-0"
            name="username"
            id="username"
            placeholder="username"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="input-group">
            <input
              type="password"
              className="input-control focus:ring-0"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
        </div>
        <div className="input-group border-0 mt-5 pt-5">
          <button onClick={handleSubmit} className="submit-button">
            Log in
          </button>
        </div>
      </form>
    </div>
  );

  function showPassword() {
    var showPwd = document.getElementById("showPwd");
    var password = document.getElementById("password");

    if (showPwd.checked) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!(username && password)) {
      setMessage("Fill in all the fields");
      return;
    }

    axios.post(`https://localhost:7038/auth/login`, {
        username: username,
        forename: "forename",
        surname: "surname",
        password: password,
        gender: "gender",
        role: "role",
      })
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("username", username);
          localStorage.setItem("plannedColor", "#f59b5b");
          localStorage.setItem("progressColor", "#de9ef0");
          localStorage.setItem("doneColor", "#72bfcf");
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) setMessage(err.response.data);
        else setMessage("Something went wrong");
        return;
      });
  }
}

export default Login;
