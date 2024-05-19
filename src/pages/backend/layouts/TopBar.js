import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "primereact/button";

//redux
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/backend/layout-slice.js";
import { authActions } from "../../../store/backend/auth-slice.js";
//react router
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  //react router
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.resetAuthData());
    navigate("/admin/login");
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#home" style={{ display: "flex" }}>
            Admin Panel
            <Button link onClick={() => dispatch(cartActions.toggleMenuBar())}>
              <i className="pi pi-bars"></i>
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
              <NavDropdown
                title={user ? user.name : ""}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1" onClick={logoutHandler}>
                  <i className="pi pi-sign-out"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
