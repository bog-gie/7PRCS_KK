import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar.js";
import "../css/EditProfile.css";

function EditProfile() {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState(null);
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

  }, []);

  useEffect(() => {
    fetchTodo(location.state.id);
  }, [location.state.id]);

  useEffect(() => {
    if (todo != null)
      fetchUser(todo.author);
  }, [todo]);

  useEffect(() => {
    setInputValues();
    if (user !== null) setStateValues();
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="row pt-5 justify-content-center">
        <div className="profile rounded-md bg-zinc-900 py-4 mt-5 col-sm-8 col-md-6 col-xl-4">
          <h2 className="text-center">Edit your profile info</h2>
          <div className="form-container">
            <form className="form">
              <div className="input-group">
                <label htmlFor="forename">forename</label>
                <input
                  type="text"
                  className="input-control focus:ring-0"
                  name="forename"
                  id="forename"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={(e) => setForename(e.target.value)}
                ></input>
              </div>
              <div className="input-group">
                <label htmlFor="surname">surname</label>
                <input
                  type="text"
                  className="input-control focus:ring-0"
                  name="surname"
                  id="surname"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={(e) => setSurname(e.target.value)}
                ></input>
              </div>
              <div className="input-group radio-group border-0 justify-content-center">
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
                <button className="submit-button" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  async function handleEdit(e) {
    e.preventDefault();

    await axios
      .put(`https://localhost:7038/users/${user.username}`, {
        forename: forename,
        surname: surname,
        gender: gender,
        username: user.username,
        role: user.role,
        password: user.password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  }

  async function fetchUser(username) {
    await axios
      .get(`https://localhost:7038/users/${username}`)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch((err) => console.log(err));
  }

  async function fetchTodo(id) {
    await axios.get(`https://localhost:7038/todos/id/${id}`)
    .then(response => {
      if (response.status === 200) {
        console.log(response);
        setTodo(response.data);
      }
    }).catch(err => console.log(err));
  }

  function setStateValues() {
    setForename(user.forename);
    setSurname(user.surname);
    setGender(user.gender);
  }

  function setInputValues() {
    if (user === null) return;

    document.getElementById("forename").value = user.forename;
    document.getElementById("surname").value = user.surname;

    var radios = document.getElementsByClassName("gender-radio");
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value === user.gender) {
        radios[i].checked = true;
      }
    }
  }
}

export default EditProfile;
