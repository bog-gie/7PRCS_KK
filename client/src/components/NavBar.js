import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "flowbite";

import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home" className="text-light">
          Todos
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="text-light"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="text-light">
          <div className="me-auto"></div>
          <Nav>
            <Nav.Link href="/export" className="text-light">
              Export
            </Nav.Link>
            <Nav.Link
              href="/profile"
              className="text-light"
              onClick={sendToEditPage}
            >
              Edit profile
            </Nav.Link>
            <Nav.Link href="#" className="text-light" onClick={handleLogout}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  function handleLogout() {
    sessionStorage.removeItem("username");
    navigate("/");
  }

  function sendToEditPage() {
    navigate("/profile", {
      state: {
        username: sessionStorage.getItem("username"),
      },
    });
  }
}

export default NavBar;
