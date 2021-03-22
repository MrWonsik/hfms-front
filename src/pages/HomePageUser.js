import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Route, Switch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "../_components/PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import TestPage from "../pages/TestPage";
import TestPage2 from "../pages/TestPage2";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const HomePageUser = ({ match }) => {
    const { user, loggedIn } = useSelector((state) => ({
        user: state.user.user,
        loggedIn: state.user.loggedIn
    }));

    return (
        <>
            <Row className="justify-content-md-center">
                <Col md="3">
                    <Jumbotron>
                        <ul>
                            <li>
                                <Link to={`${match.url}`}>Home</Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/smth1`}>Smth1</Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/smth2`}>Smth2</Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/smth3`}>Smth3</Link>
                            </li>
                        </ul>
                    </Jumbotron>
                </Col>
                <Col md="9">
                    <Jumbotron>
                        <Switch>
                            <PrivateRoute user={user} role="ROLE_USER" path={`${match.path}/smth1`} component={TestPage2}/>
                            <PrivateRoute user={user} role="ROLE_USER" path={`${match.path}/smth2`} component={TestPage2}/>
                            <PrivateRoute user={user} role="ROLE_USER" path={`${match.path}/smth3`} component={TestPage}/>
                            <PrivateRoute user={user} role="ROLE_USER" path={`${match.path}`} component={TestPage2}/>
                            {!loggedIn && <Redirect from="*" to="/login" />}
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </Jumbotron>
                </Col>
            </Row>
        </>
    );
}

export default HomePageUser;