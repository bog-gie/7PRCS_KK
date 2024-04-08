import "../css/LoginPage.css";
import Register from "./Register.js";
import Login from "./Login.js";
import { useEffect, useState } from "react";

function LoginPage() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex mx-auto justify-center items-center w-full md:w-[500px]">
      <div className="container login-container py-5 px-0 my-20 rounded-lg bg-zinc-900">
        <div className="toggle-container flex justify-center" id="toggleContainer">
          <span className="bg-gradient-to-br from-blue-300 to-purple-700 absolute right-1/2 w-1/2 h-full rounded-full border-0 z-0" id="toggle"></span>
          <button
            className="login-toggle px-5 z-10"
            id="loginToggle"
            onClick={toggleButton}
          >
            Login
          </button>
          <button
            className="register-toggle px-5 z-10"
            id="registerToggle"
            onClick={toggleButton}
          >
            Register
          </button>
        </div>
      <div className="content h-full d-flex items-start">{toggle ? <Register /> : <Login />}</div>
      </div>
    </div>
  );

  function toggleButton(e) {
    var login = document.getElementById("loginToggle");
    var register = document.getElementById("registerToggle");
    var toggle = document.getElementById("toggle");
    var form = document.getElementById("form-container");

    if (e.target.id === "loginToggle") {
      toggle.style.transition = "left 0.3s";
      toggle.style.left = "0";
      setToggle(false);
    }

    if (e.target.id === "registerToggle") {
      toggle.style.transition = "left 0.3s";
      toggle.style.left = "50%";
      setToggle(true);
    }
  }
}

export default LoginPage;
