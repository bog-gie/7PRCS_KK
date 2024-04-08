import NavBar from "./NavBar.js";
import "../css/TodoPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import TodoFilter from "./TodoFilter.js";

function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [state, setState] = useState("planned");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("username")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    
  }, [todos])

  return (
    <>
      <NavBar />
      <div className="block justify-center pt-5 md:flex">
        <div className="conteiner mb-3 py-3 lg:mx-0 md:mx-auto w-full bg-zinc-900 sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/3 rounded-lg">
          <TodoForm
            todos={todos}
            setTodos={setTodos}
            state={state}
            setState={setState}
            update={update}
            setUpdate={setUpdate}
          />
          <div className="w-11/12 flex flex-column mx-auto my-4 todos-container">
            <TodoList
              todos={todos}
              setTodos={setTodos}
              setState={setState}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
        </div>
        <div className="lg:pt-5 lg:mt-5">
          <div className="h-fit mt-0 lg:mt-5 lg:pt-5 lg:ml-5 flex justify-center">
            <TodoFilter setTodos={setTodos} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoPage;
