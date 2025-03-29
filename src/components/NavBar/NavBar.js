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
                  className={`btn-lg ${currentPath === "/" ? "btn-active" : ""}`}
                  disabled={currentPath === "/"}
                  data-cy="home-button"
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
                    className={`btn-lg ${currentPath === "/about" ? "btn-active" : ""}`}
                    disabled={currentPath === "/about"}
                    data-cy="about-button"
                  >
                    Sobre
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button
                    className={`btn-lg ${currentPath === "/register" ? "btn-active" : ""}`}
                    disabled={currentPath === "/register"}
                    data-cy="register-button"
                  >
                    Cadastrar Livro
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/booklist">
                  <Button
                    className={`btn-lg ${currentPath === "/booklist" ? "btn-active" : ""}`}
                    disabled={currentPath === "/booklist"}
                    data-cy="booklist-button"
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
