import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import HomePageUser from './HomePageUser';
import HomePageAdmin from './HomePageAdmin';
import TestPage from './TestPage';
import NotFoundPage from './NotFoundPage';
import LoginPage from './LoginPage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';

const renderHomepage = (user) => {
    switch(user.role) {
        case 'ROLE_ADMIN': return <PrivateRoute user={user} role="ROLE_ADMIN" path="/home" component={HomePageAdmin} />
        case 'ROLE_USER': return <PrivateRoute user={user} role="ROLE_USER" path="/home" component={HomePageUser} />
        default: false
    }
}

const App = () => {

    const Text = styled.div`
        text-align: center;
    `;

    const { alert, user } = useSelector(state => ({
        alert: state.alert,
        user: state.authentication.user,
    }));
    const dispatch = useDispatch();
    
    useEffect(() => {
        history.listen(() => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);
    
    return (
        <Container fluid>
            <Row>
                <Col>
                    {alert.message &&
                        <Alert className="fixed-top m-3" key={alert.message} variant={alert.type} onClose={() => dispatch(alertActions.clear())} dismissible>
                            <Text>{alert.message}</Text> 
                        </Alert>
                    }
                    <Router history={history}>
                        <Switch>
                            { user && user.role && renderHomepage(user) }
                            <PrivateRoute user={user} role="ROLE_ADMIN" path="/test" component={TestPage} />   
                            <Route path="/login" component={LoginPage} />
                            <Route exact path="*" component={NotFoundPage} />
                        </Switch>
                    </Router>
                </Col>
            </Row>
            <div className="fixed-down"><Text>Tomasz Wąsacz 2021</Text></div>
        </Container>
    );
}

export default App;