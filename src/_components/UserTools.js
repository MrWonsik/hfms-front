import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import { changePassword } from '../user/user.actions';


const UserTools = () => {

  const { user } = useSelector(state => ({
    user: state.user.user,
  }));

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setOldPassword("");
    setNewPassword("");
    setRepeatedNewPassword("");
    setSubmitted(false);
  }
  const handleShow = () => {
    setShow(true);
  }


  const handleOldPasswordInput = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPasswordInput = (e) => {
    setNewPassword(e.target.value);
  };
  const handleRepeatedNewPasswordInput = (e) => {
    setRepeatedNewPassword(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (oldPassword && newPassword && repeatedNewPassword) {
        dispatch(changePassword(oldPassword, newPassword, repeatedNewPassword, user)).then((isPasswordChanged) => {
          if(isPasswordChanged) {
            handleClose();
          }
        });
    }
  };

  return (
    <>
      <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link onClick={handleShow}>Change password</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/login">Logout</Nav.Link>
        </Nav.Item>
      </Nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="oldPassword">
            <Form.Label>Old password:</Form.Label>
            <Form.Control
              type="password"
              className={ "form-control" + (submitted && !oldPassword ? " is-invalid" : "") }
              name="oldPassword"
              value={oldPassword}
              onChange={handleOldPasswordInput}
              placeholder="Enter your old password"
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>New password:</Form.Label>
            <Form.Control
              type="password"
              className={ "form-control" + (submitted && !newPassword ? " is-invalid" : "") }
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordInput}
              placeholder="Enter new password"
            />
            <Form.Control.Feedback type="invalid">
              New password is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="repeatedNewPassword">
            <Form.Label>Repeat new password:</Form.Label>
            <Form.Control
              type="password"
              className={ "form-control" + (submitted && !repeatedNewPassword ? " is-invalid" : "") }
              name="repeatedNewPassword"
              value={repeatedNewPassword}
              onChange={handleRepeatedNewPasswordInput}
              placeholder="Repeat new password"
            />
            <Form.Control.Feedback type="invalid">
              Repeat new password is required
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleChangePassword}>
            Change password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTools;
