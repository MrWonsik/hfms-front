import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "./_helpers";
import { alertClear } from "./alert/alert.actions";
import PrivateRoute from "./_components/PrivateRoute";
import HomePageUser from "./pages/HomePageUser";
import HomePageAdmin from "./pages/HomePageAdmin";
import TestPage from "./pages/TestPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";

const renderHomepage = (user) => {
  switch (user.role) {
    case "ROLE_ADMIN": return ( <PrivateRoute user={user} role="ROLE_ADMIN" path="/home" component={HomePageAdmin} /> );
    case "ROLE_USER": return ( <PrivateRoute user={user} role="ROLE_USER" path="/home" component={HomePageUser} /> );
    default: false;
  }
};

const App = () => {
  const [show, setShow] = useState(false);
  const Text = styled.div`
    text-align: center;
  `;

  const { alert, user, loggedIn } = useSelector((state) => ({
    alert: state.alert,
    user: state.user.user,
    loggedIn: state.user.loggedIn,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(alertClear());
    history.listen(() => dispatch(alertClear()));
  }, []);

  useEffect(() => { 
    setShow(true); 
  }, [alert])

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {show && alert.message && (
              <Alert
                className="fixed-top m-3 alert-main"
                key={alert.message}
                variant={alert.type}
                onClose={() => dispatch(alertClear())}
                dismissible
              >
                <Text>{alert.message}</Text>
              </Alert>
            )}
            <Router history={history}>
              <Switch>
                {user && user.role && renderHomepage(user)}
                <PrivateRoute
                  user={user}
                  role="ROLE_ADMIN"
                  path="/test"
                  component={TestPage}
                />
                <Route exact path="/login" component={LoginPage} />
                {!loggedIn && <Redirect from="*" to="/login" />}
                <Route exact path="*" component={NotFoundPage} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </Container>
      <div className="author-footer">
        <Text>Tomasz Wąsacz 2021</Text>
      </div>
    </>
  );
};

export default App;
