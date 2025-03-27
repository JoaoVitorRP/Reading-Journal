import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function NavBar(props) {
  const currentPath = useLocation().pathname;

  return (
    <div>
      <div className="content-hider"></div>

      <Navbar expand="lg" className="bg-white rounded shadow">
        <div className="position-relative w-100">
          <Container>
            <div className="position-absolute left">
              <Navbar.Brand as={Link} to="/">
                <Button
                  className={`btn btn-primary btn-lg ${currentPath === "/" ? "btn-active" : ""}`}
                  disabled={currentPath === "/"}
                >
                  <i className="bi bi-house-door-fill"></i>
                </Button>
              </Navbar.Brand>
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/about">
                  <Button
                    className={`btn btn-primary btn-lg ${currentPath === "/about" ? "btn-active" : ""}`}
                    disabled={currentPath === "/about"}
                  >
                    Sobre
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button
                    className={`btn btn-primary btn-lg ${currentPath === "/register" ? "btn-active" : ""}`}
                    disabled={currentPath === "/register"}
                  >
                    Cadastrar Livro
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/booklist">
                  <Button
                    className={`btn btn-primary btn-lg ${currentPath === "/booklist" ? "btn-active" : ""}`}
                    disabled={currentPath === "/booklist"}
                  >
                    Ver Leituras
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </div>
      </Navbar>

      {props.children}
    </div>
  );
}
