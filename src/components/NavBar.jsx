import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavBar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <>
      <Navbar bg="secondary" variant="dark" className="navbar"> 
        <Container className="justify-content-end">
          <Nav>
            <NavLink
              to="/"
              className={setActiveClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/pokemones"
              className={setActiveClass}
            >
              Pokemones
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;