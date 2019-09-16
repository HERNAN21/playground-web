import React from "react";
import {
  UncontrolledCollapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  Button
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-horizontal navbar-main navbar-dark ransa-bg-info"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              className="navbar-custom-collapse"
              navbar
              toggler="#navbar-collapse"
            >
              <Nav className="mr-auto" navbar>
              </Nav>
              <hr className="d-lg-none" />
              <Nav className="align-items-lg-center ml-lg-auto" navbar>                
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="auth/login"
                    // target="_blank"
                  >
                    <span className="btn-inner--icon">
                    </span>
                    <span className="nav-link-inner--text">Ingresar</span>
                  </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
