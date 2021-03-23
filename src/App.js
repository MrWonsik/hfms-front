import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, BrowserRouter, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { alertClear } from "./alert/alert.actions";
import HomePageUser from "./pages/HomePageUser";
import HomePageAdmin from "./pages/HomePageAdmin";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import UserTools from "./_components/UserTools";

const renderHomepage = (user) => {
  switch (user.role) {
    case "ROLE_ADMIN": return ( <Route exact path="/home" component={HomePageAdmin} /> );
    case "ROLE_USER": return ( <Route path="/home" component={HomePageUser} /> );
    default: false;
  }
};

const App = () => {
  const [show, setShow] = useState(false);

  const { alert, user, loggedIn } = useSelector((state) => ({
    alert: state.alert,
    user: state.user.user,
    loggedIn: state.user.loggedIn,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(alertClear());
  }, []);

  useEffect(() => { 
    setShow(true); 
  }, [alert])

  return (
    <>
      <Container fluid>
        <Row className="mb-5">
          <Col>
            {show && alert.message && (
              <Alert
                className="fixed-top m-3 alert-main"
                key={alert.message}
                variant={alert.type}
                onClose={() => dispatch(alertClear())}
                dismissible
              >
                <div className = "text-center">{alert.message}</div>
              </Alert>
            )}
            <BrowserRouter>
              <>
                {loggedIn && <UserTools />}
                <Switch>
                  {user?.role && renderHomepage(user)}
                  <Route exact path="/login" component={LoginPage} />
                  {!loggedIn && <Redirect from="*" to="/login" />}
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
      <div className="author-footer">
        <div className="text-center">Tomasz Wąsacz 2021</div>
      </div>
    </>
  );
};

export default App;
