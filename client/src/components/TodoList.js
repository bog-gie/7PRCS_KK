import { useEffect, useState } from "react";
import axios from "axios";
import "../css/TodoPage.css";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function TodoList({ todos, setTodos, setState, update, setUpdate }) {
  const [user, setUser] = useState(null);
  const [todo, setTodo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
    fetchUser(sessionStorage.getItem("username"));
  }, []);

  useEffect(() => {
    setTodosColor();
    setCheckboxes();
  }, [todos]);

  useEffect(() => {
    if (todo) {
    todo.state === "done" ?
    toggleState(todo.id, "in progress") :
    toggleState(todo.id, "done");
    }
  }, [todo]);

  return Object.keys(todos).map((todo, index) => (
    <div className="rounded-md mt-1">
    <div
      className="todo text-neutral-900 opacity-90 font-bold rounded-lg items-center h-full w-full px-1.5 py-0.5"
      key={index}
      data-id={todos[todo].id}
      data-state={todos[todo].state}
    >
      <div className="flex items-center"
      onClick={showDetails}>

        {todos[todo].state === "done" ? 
        <input type="checkbox" className="h-8 state-checkbox" checked onClick={handleToggleState}/> :
        <input type="checkbox" className="h-8 state-checkbox" onClick={handleToggleState}/>}

        {todos[todo].state === "done" ? 
        <div className="w-11/12 py-1 pl-1 hover:cursor-pointer truncate line-through">{todos[todo].text}</div> :
        <div className="w-11/12 py-1 pl-1 hover:cursor-pointer truncate">{todos[todo].text}</div>}

        {user && user.role === "admin" ? (
          <i class="bi bi-person-fill-gear px-1 fs-5 hover:cursor-pointer" onClick={handleEditUser}></i>
        ) : null}
        <i className="bi bi-pencil-fill px-1 hover:cursor-pointer" onClick={handleUpdate}></i>
        <i className="bi bi-x-circle-fill hover:cursor-pointer" onClick={confirmDelete}></i>
      </div>
    </div>
    </div>
  ));

  function handleEditUser(e) {
    e.preventDefault();
    var id = e.target.parentElement.parentElement.getAttribute("data-id");
    
    navigate("/profile", {
      state: {
        id: id,
      },
    });
  }

  function confirmDelete(e) {
    confirmAlert({
      title: 'Confirm to continue',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(e)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  async function handleDelete(e) {
    var todoId = e.target.parentElement.parentElement.getAttribute("data-id");
    await axios
      .delete(`https://localhost:7038/todos/${todoId}`)
      .then((response) => {
        if (response.status === 200) {
          fetchTodos();
        }
      })
      .catch((err) => console.log(err));

    document.getElementById("state").value = "planned";
  }

  async function handleUpdate(e) {
    setUpdate(true);
    await showDetails(e);

    var submit = document.getElementById("updateButton");
    var textInput = document.getElementById("text");
    var startDate = document.getElementById("startDate");
    var endDate = document.getElementById("endDate");
    var state = document.getElementById("state");

    textInput.value = e.target.parentElement.parentElement.innerText;
    var todoId = e.target.parentElement.parentElement.getAttribute("data-id");

    submit.onclick = async (e) => {
      e.preventDefault();
      if (textInput.value.trim() === "") return;
      await axios
        .put(`https://localhost:7038/todos`, {
          id: todoId,
          text: textInput.value,
          author: sessionStorage.getItem("username"),
          state: state.value,
          start: new Date(formatDate(new Date(startDate.value))),
          end: new Date(formatDate(new Date(endDate.value))),
        })
        .then((response) => {
          if (response.status === 200) {
            fetchTodos();
            textInput.value = "";
          }
          setUpdate(false);
        })
        .catch((err) => console.log(err));
    };
  }

  async function handleToggleState(e) {
    
    var id = e.target.parentElement.parentElement.getAttribute("data-id");
    await fetchTodo(id);
    setCheckboxes();
  }

  async function toggleState(id, state) {
    await axios
    .put(`https://localhost:7038/todos`, {
      id: id,
      text: todo.text,
      author: todo.author,
      state: state,
      start: todo.start,
      end: todo.end,
    })
    .then((response) => {
      if (response.status === 200) {
        fetchTodos();
      }
    })
    .catch((err) => console.log(err));
  }

  async function fetchTodos() {
    var username = sessionStorage.getItem("username");
    await axios
      .get(`https://localhost:7038/todos/${username}?sort=startDateAsc`)
      .then((response) => setTodos(response.data));
  }

  async function fetchTodo(id) {
    await axios
      .get(`https://localhost:7038/todos/id/${id}`)
      .then((response) => {
        setTodo(response.data);
      });
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

  async function showDetails(e) {  
    if (update) return;
    var stateInput = document.getElementById("state");
    var start = document.getElementById("startDate");
    var end = document.getElementById("endDate");
    var text = document.getElementById("text");

    var id =  e.target.parentElement.parentElement.getAttribute("data-id");
    text.value = e.target.innerText;

    await axios.get(`https://localhost:7038/todos/id/${id}`)
    .then((response) => {
      stateInput.value = response.data.state;
      setState(response.data.state);
      start.value = formatDate(response.data.start);
      end.value = formatDate(response.data.end);
    }).catch(err => console.log(err));
  
    if (e.target.style.whiteSpace === "normal") {
      e.target.style.whiteSpace = "nowrap"
    }
    else {
      e.target.style.whiteSpace = "normal";
    }
  }

  function formatDate(date) {
    var dateTemp = new Date(date);
    var day = dateTemp.getDate();
    var month = dateTemp.getMonth() + 1;
    var year = dateTemp.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;
  }

  function setTodosColor() {
    var todos = document.getElementsByClassName("todo");
    
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].getAttribute("data-state") === "planned") {
        todos[i].style.background = localStorage.getItem("plannedColor");
      }
      if (todos[i].getAttribute("data-state") === "in progress") {
        todos[i].style.background = localStorage.getItem("progressColor");
      }
      if (todos[i].getAttribute("data-state") === "done") {
        todos[i].style.background = localStorage.getItem("doneColor");
      }
      todos[i].style.whiteSpace = "nowrap";
    }
  }

  function setCheckboxes() {
    var states = document.getElementsByClassName("state-checkbox");
    for (var i = 0; i < states.length; i++) {
      var state = states[i].parentElement.parentElement.getAttribute("data-state");
      if (state === "done") {
        states[i].checked = true;
      }
      else {
        states[i].checked = false;
      }
    }
  }
}

export default TodoList;
