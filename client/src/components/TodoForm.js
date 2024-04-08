import axios from "axios";
import { useEffect, useState } from "react";
import "../css/TodoPage.css";

function TodoForm({ todos, setTodos, state, setState, update, setUpdate }) {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setDefaultDate();
  }, []);

  useEffect(() => {
    var date = new Date();
    if (startDate < formatDate(date) || endDate < formatDate(date)) {
      setMessage("Invalid start/end date");
    }
    else {
      setMessage("");
    }
  }, [startDate, endDate]);

  return (
    <form className="w-11/12 mx-auto">
      <h2 className="text-center pt-3 pb-1">What's on the plan today?</h2>
      <p className="text-center text-danger">{message ? message : null}</p>
      <div className="flex p-0.5 pb-0 justify-center bg-gradient-to-br from-purple-600 to-blue-500 rounded-tl-md rounded-tr-md">
        <input
          type="date"
          className="w-1/3"
          name="start"
          id="startDate"
          onChange={(e) => setStartDate(formatDate(new Date(e.target.value)))}
        ></input>
        <input
          type="date"
          className="w-1/3"
          name="end"
          id="endDate"
          onChange={(e) => setEndDate(formatDate(new Date(e.target.value)))}
        ></input>
        <select
          className="w-1/3 bg-zinc-900 border-0 text-center focus:outline-0"
          name="state"
          id="state"
          onChange={(e) => setState(e.target.value)}
        >
          <option value="planned">planned</option>
          <option value="in progress">in progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <div className="flex p-0.5 justify-center bg-gradient-to-br from-purple-600 to-blue-500 rounded-bl-md rounded-br-md">
        <input
          type="text"
          className="w-2/3 bg-zinc-900 px-2 focus:outline-none border-none"
          name="text"
          id="text"
          placeholder="Type in your todo task.."
          autoComplete="off"
          autoCorrect="off"
          onChange={(e) => setText(e.target.value)}
        ></input>
        {update ? (
          <div className="flex flex-column w-1/3 items-center">
            <button className="relative w-full  h-1/2 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 p-0.5 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 text-white focus:outline-none">
              <span className="relative w-full py-2 transition-all ease-in duration-75 bg-zinc-900 group-hover:bg-opacity-0"
              id="updateButton"
              onClick={() => setText("")}>
                  Update
              </span>
            </button>
            <button className="relative w-full py-0  h-1/2 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 p-0.5 group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 text-white focus:outline-none">
              <span className="relative w-full py-2 transition-all ease-in duration-75 bg-zinc-900 group-hover:bg-opacity-0"
              onClick={() => setUpdate(false)}>
                  Cancel
              </span>
            </button>
          </div>
        ) : (
          <button className="relative w-1/3 inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 group text-white fw-bold bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 focus:outline-none">
          <span className="relative w-full py-2.5 transition-all ease-in duration-75 bg-zinc-900 group-hover:bg-opacity-0"
          onClick={handleSubmit}>
              Add todo
          </span>
        </button>
        )}
      </div>
    </form>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;

    var date = new Date();
    if (startDate < formatDate(date) || endDate < formatDate(date)) {
      return;
    }

    await axios
      .post("https://localhost:7038/todos", {
        text: text,
        author: sessionStorage.getItem("username"),
        state: state,
        start: new Date(startDate),
        end: new Date(endDate),
      })
      .then((response) => {
        if (response.status === 200) {
          setTodos([...todos, response.data]);
          setText("");
          document.getElementById("text").value = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function fetchTodos() {
    var username = sessionStorage.getItem("username");
    axios
      .get(`https://localhost:7038/todos/${username}?sort=startDateAsc`)
      .then((response) => setTodos(response.data));
  }

  function setDefaultDate() {
    var startDate = document.getElementById("startDate");
    var endDate = document.getElementById("endDate");
    var date = new Date();
    startDate.value = formatDate(date);
    endDate.value = formatDate(date);
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
}

export default TodoForm;
