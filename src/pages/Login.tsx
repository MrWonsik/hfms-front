import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Form, Button, Spinner, Jumbotron } from 'react-bootstrap'

import { login, logout } from '../features/user/oldRedux/user.actions'
import { RootState } from '../app/storeTS'
import { TS_TURN_ON } from '..'
import { loginTS } from '../features/user/user'

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch()

  const { loggingIn } = useSelector((state: RootState) => ({
    loggingIn: state.user.loggingIn
  }))

  useEffect(() => {
    dispatch(logout())
  }, [])

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUsername(e.target.value)
  }
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>):void => {
    e.preventDefault()
    setSubmitted(true)
    if (username && password) {
      dispatch(TS_TURN_ON ? loginTS({username, password}) : login(username, password))
    }
  }

  return (
		<Row className="justify-content-md-center">
			<Col className="mt-5" md="4">
				<Jumbotron className="py-5 login-page-jumbotron">
					<h2>Login</h2>
					<Form name="form" onSubmit={handleSubmit}>
						<Form.Group controlId="formUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								className={"form-control" + (submitted && !username && " is-invalid")}
								name="username"
								value={username}
								onChange={handleUsernameInput}
								placeholder="Enter username"
							/>
							<Form.Control.Feedback type="invalid">
								Username is required
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								className={"form-control" + (submitted && !password && " is-invalid")}
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
							{loggingIn && <Spinner animation="border" size="sm" />}{" "}
							<Button variant="primary" type="submit">
								Login
							</Button>
						</Form.Group>
					</Form>
				</Jumbotron>
			</Col>
		</Row>
	);
}

export default LoginPage
