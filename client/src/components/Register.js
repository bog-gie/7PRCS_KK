import { useState } from "react";
import "../css/Register.css";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <div className="form-container w-11/12 sm:w-3/5 md:w-3/4 lg:w-3/5">
      <form className="form container">
        <div className="error-msg" id="errorMessage">
          {loginSuccess && message ? 
          <p className="text-success fs-6">{message ? message : null}</p> : 
          <p className="text-danger fs-6">{message ? message : null}</p>}


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
            type="text"
            className="input-control focus:ring-0"
            name="forename"
            id="forename"
            placeholder="name"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setForename(e.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="input-control focus:ring-0"
            name="surname"
            id="surname"
            placeholder="last name"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setSurname(e.target.value)}
          ></input>
        </div>
        <div className="input-group">
          <input
            type="password"
            className="input-control focus:ring-0"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="input-group">
            <input
              type="password"
              className="input-control focus:ring-0"
              id="password2"
              name="password2"
              placeholder="repeat password"
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
        </div>
        <div className="flex justify-center pt-4">
          <div className="radio-field">
            <input
              type="radio"
              name="gender"
              value="man"
              className="gender-radio focus:ring-0"
              defaultChecked
              onClick={(e) => setGender(e.target.value)}
            ></input>
            &nbsp;Man
          </div>
          <div className="radio-field">
            <input
              type="radio"
              name="gender"
              value="woman"
              className="gender-radio focus:ring-0"
              onClick={(e) => setGender(e.target.value)}
            ></input>
            &nbsp;Woman
          </div>
        </div>
        <div className="input-group border-0">
          <button onClick={handleSubmit} className="submit-button">
            Create account
          </button>
        </div>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoginSuccess(false);
    var msg = document.getElementById("errorMessage");
    msg.style.color = "red";

    if (!(username && forename && surname && password && password2)) {
      setMessage("Fill in all the fields");
      return;
    }
    if (password !== password2) {
      setMessage("Passwords doesn't match");
      return;
    }
    var regex = /[-’/`~!#*$@_%+=."',^&(){}[\]|;:”<>?\\]/g;
    if (regex.test(username + forename + surname)) {
      setMessage("No special chars allowed in username");
      return;
    }

    axios.post(`https://localhost:7038/auth/register`, {
        username: username,
        forename: forename,
        surname: surname,
        password: password,
        gender: gender,
        role: "user",
      })
      .then((response) => {
        if (response.status === 200) {
          setLoginSuccess(true);
          setMessage("Register successful");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {

          setMessage(err.response.data);
        } else setMessage("Something went wrong");
      });

    clearInputs();
  }

  function clearInputs() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "text" || inputs[i].type === "password") {
        inputs[i].value = "";
      }
    }
  }
}

export default Register;
