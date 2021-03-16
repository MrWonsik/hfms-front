import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


import { userActions } from './_actions';
import { Jumbotron } from 'react-bootstrap';

const LoginPage = () => {
    const dispatch = useDispatch();
    // reset login status
    const { loggingIn, loggedIn } = useSelector(state => ({
        loggingIn: state.authentication.loggingIn,
        loggedIn: state.authentication.loggedIn
    }));

    useEffect(() => {
        dispatch(userActions.logout()); 
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleUsernameInput = e => {
        setUsername(e.target.value);
    }
    const handlePasswordInput = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    const loader = () => {
        return <Spinner animation="border" size="sm" />
    }

    return (
        <Row className="justify-content-md-center">
            <Col className="mt-5" md="4">
                <Jumbotron className="py-5">
                    <h2>Login</h2>
                    <Form name="form" onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text" 
                                className={"form-control" + (submitted && !username ? ' is-invalid' : '')}
                                name="username" 
                                value={username} 
                                onChange={handleUsernameInput}
                                type="text" 
                                placeholder="Enter username"/>
                            <Form.Control.Feedback type="invalid">
                                Username is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                className={"form-control" + (submitted && !password ? ' is-invalid' : '')}
                                name="password" 
                                value={password} 
                                onChange={handlePasswordInput}
                                placeholder="Enter password"
                            />
                            <Form.Control.Feedback type="invalid">
                                Password is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="text-right">
                            {loggingIn && loader()}
                            {' '}
                            <Button variant="primary" type="submit">Login</Button>
                        </Form.Group>
                    </Form>
                </Jumbotron>
            </Col>
        </Row>
    );

}

export default LoginPage;