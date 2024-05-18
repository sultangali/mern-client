import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, logout, fetchAuthMe } from "../redux/slices/user.js"

const Header = () => {

  const isAuth =useSelector(selectIsAuth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  },[dispatch])

  const userData = useSelector((state) => state.user.data);

  const onClickLogout = () => {
      dispatch(logout());
      window.localStorage.removeItem("token");
      window.location.assign('/')
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Container>
          <Link  to={"/"}>
            <Navbar.Brand >
            BRAND
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/todo">TODO</Nav.Link>
            </Nav>
            <Nav>
              {isAuth ? (
                <>
                {userData && userData.status ?
                 (<Nav.Link href="/profile"> Қош келдіңіз, &nbsp;
                  {userData && userData.fullname && userData.fullname}
                  </Nav.Link> ): ''}
                  <Nav.Link
                    eventKey={2}
                    onClick={() => onClickLogout()}>
                    Шығу
                  </Nav.Link>
                </>
              ) : (
                <><Nav.Link href="/login">Авторизация</Nav.Link></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
