import axios from "axios";
import { useEffect, useState } from "react";
import "../css/TodoPage.css";

function StatePicker({ setTodos }) {
  const [sortOrder, setSortOrder] = useState("startDateAsc");
  const [stateOrder, setStateOrder] = useState("");

  useEffect(() => {
    document.getElementById("plannedColor").value =
      localStorage.getItem("plannedColor");
    document.getElementById("progressColor").value =
      localStorage.getItem("progressColor");
    document.getElementById("doneColor").value =
      localStorage.getItem("doneColor");
  }, []);

  useEffect(() => {
    var username = sessionStorage.getItem("username");
    const fetch = async () =>
      await axios
        .get(
          `https://localhost:7038/todos/${username}?sort=${sortOrder}&state=${stateOrder}`
        )
        .then((response) => {
          setTodos(...[response.data]);
        })
        .catch((err) => console.log(err));
    fetch();
  }, [sortOrder, stateOrder]);

  return (
    <div className="flex flex-column mt-2">
      <div className="py-4 container">
        <div className="input-group px-3 justify-start flex">
          <input
            type="color"
            className="color"
            id="plannedColor"
            onChange={(e) => changeTodosColor(e)}
            onClick={hadnleState}
          ></input>
          <span className="color-label" onClick={handleSetState}>
            planned
          </span>
        </div>
        <div className="input-group px-3 justify-start flex">
          <input
            type="color"
            className="color"
            id="progressColor"
            onChange={(e) => changeTodosColor(e)}
            onClick={hadnleState}
          ></input>
          <span className="color-label" onClick={handleSetState}>
            in progress
          </span>
        </div>
        <div className="input-group px-3 justify-start flex">
          <input
            type="color"
            className="color"
            id="doneColor"
            onChange={(e) => changeTodosColor(e)}
            onClick={hadnleState}
          ></input>
          <span className="color-label" onClick={handleSetState}>
            done
          </span>
        </div>
        <div className="input-group mt-3 rounded-md justify-center flex">
          <select
            className="focus:ring-0 text-slate-300 rounded-md border-0 fw-bold text-center block bg-transparent"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="startDateAsc" className="text-white-800 bg-zinc-800">Start date &uarr;</option>
            <option value="startDateDesc" className="text-white-800 bg-zinc-800">Start date &darr;</option>
            <option value="endDateAsc" className="text-white-800 bg-zinc-800">End date &uarr;</option>
            <option value="endDateDesc" className="text-white-800 bg-zinc-800">End date &darr;</option>
          </select>
        </div>
      </div>
    </div>
  );

  function hadnleState() {
    setStateOrder("");

    var stateLabels = document.getElementsByClassName("color-label");
    for (var i = 0; i < stateLabels.length; i++) {
      stateLabels[i].style.fontWeight = "normal";
    }
  }

  function changeTodosColor(e) {
    var todos = document.getElementsByClassName("todo");
    var color = e.target.value;

    var planned = 0;
    var inProgress = 0;
    var done = 0;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].getAttribute("data-state") === "planned") {
        planned++;
      }
      if (todos[i].getAttribute("data-state") === "in progress") {
        inProgress++;
      }
      if (todos[i].getAttribute("data-state") === "done") {
        done++;
      }
    }

    if (planned === 0) {
      document.getElementById("plannedColor").value = localStorage.getItem("plannedColor");
    }
    if (inProgress === 0) {
      document.getElementById("progressColor").value = localStorage.getItem("progressColor");
    }
    if (done === 0) {
      document.getElementById("doneColor").value = localStorage.getItem("doneColor");
    }

    for (var i = 0; i < todos.length; i++) {
      if (
        todos[i].getAttribute("data-state") === "planned" &&
        e.target.id === "plannedColor" &&
        planned > 0
      ) {
        todos[i].style.background = color;
        localStorage.setItem("plannedColor", color);
      }
      if (
        todos[i].getAttribute("data-state") === "in progress" &&
        e.target.id === "progressColor" &&
        inProgress > 0
      ) {
        todos[i].style.background = color;
        localStorage.setItem("progressColor", color);
      }
      if (
        todos[i].getAttribute("data-state") === "done" &&
        e.target.id === "doneColor" &&
        done > 0
      ) {
        todos[i].style.background = color;
        localStorage.setItem("doneColor", color);
      }
    }
  }

  function handleSetState(e) {
    var stateLabels = document.getElementsByClassName("color-label");

    for (var i = 0; i < stateLabels.length; i++) {
      if (stateLabels[i].innerText === e.target.innerText) {
        if (e.target.style.fontWeight === "bold") {
          stateLabels[i].style.fontWeight = "normal";
          setStateOrder("");
        } else {
          stateLabels[i].style.fontWeight = "bold";
          setStateOrder(e.target.innerText);
        }
      } else {
        stateLabels[i].style.fontWeight = "normal";
      }
    }
  }
}

export default StatePicker;
