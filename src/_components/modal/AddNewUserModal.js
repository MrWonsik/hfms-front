import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { closeModalAddNewUser } from '../../modal/modal.actions'
import { mapRoleToDomain } from '../../_helpers/roleMapper'
import { createUser } from "../../user/users/users.actions";


export const ChangePasswordModal = () => {

    const dispatch = useDispatch();

    const { addNewUserModalIsOpen, creatingUserInProgress } = useSelector(state => ({
        addNewUserModalIsOpen: state.modals.addNewUserModalIsOpen,
        creatingUserInProgress: state.users.creatingUserInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const handleClose = () => {
        dispatch(closeModalAddNewUser())
        setUsername("");
        setPassword("");
        setRole("user");
        setSubmitted(false);
      }

    const handleAddNewUser = (e) => {
        e.preventDefault();
    
        setSubmitted(true);
        if (username && password && role) {
            dispatch(createUser(username, password, mapRoleToDomain(role))).then((isUserCreated) => {
                if(isUserCreated) {
                    handleClose();
                }
            }).catch(shouldRedirect => shouldRedirect && history.push("/login"));
        }
      };

    return (<Modal show={addNewUserModalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>User creator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="username">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    className={ "form-control" + (submitted && !username ? " is-invalid" : "") }
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
            <Form.Control.Feedback type="invalid">
                Username is required
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>New password:</Form.Label>
                <Form.Control
                    type="password"
                    className={ "form-control" + (submitted && !password ? " is-invalid" : "") }
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                <Form.Control.Feedback type="invalid">
                    Password is required
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="repeatedNewPassword">
                <Form.Label>Role:</Form.Label>
                    <Form.Control
                        as="select"
                        className={ "form-control" + (submitted && !role ? " is-invalid" : "") }
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option>user</option>
                        <option>admin</option>
                    </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Repeat new password is required
                </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            { creatingUserInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleAddNewUser}>
                    Create user
            </Button>
        </Modal.Footer>
      </Modal>)
}

export default ChangePasswordModal;