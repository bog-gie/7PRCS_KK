import "./css/App.css";
import LoginPage from "./components/LoginPage.js";
import Register from "./components/Register.js";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import TodoPage from "./components/TodoPage.js";
import TodoExport from "./components/TodoExport.js";
import EditProfile from "./components/EditProfile.js";
import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/home" element={<TodoPage />} />
          <Route path="/export" element={<TodoExport />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
