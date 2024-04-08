import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TodoExport() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    exportFile();
    navigate("/home");
  }, []);

  async function exportFile() {
    await axios
      .get(`https://localhost:7038/todos/${username}/export`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "text/plain" })
        );
        const link = document.createElement("a");
        link.download = "todos.txt";
        link.href = url;
        link.click();
      })
      .catch((err) => console.log(err));
  }
}

export default TodoExport;
