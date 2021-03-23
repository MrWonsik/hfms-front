import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { closeModalChangePassword } from '../../modal/modal.actions'

import { changePassword } from '../../user/user.actions';
import { useHistory } from "react-router";


export const ChangePasswordModal = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    const { isModalChangePasswordOpen, updatingPasswordInProgress } = useSelector(state => ({
        isModalChangePasswordOpen: state.modals.changePasswordModalIsOpen,
        updatingPasswordInProgress: state.user.updatingPasswordInProgress
    }));

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);  

    const handleClose = () => {
        dispatch(closeModalChangePassword())
        setOldPassword("");
        setNewPassword("");
        setRepeatedNewPassword("");
        setSubmitted(false);
      }

    const handleChangePassword = (e) => {
        e.preventDefault();
    
        setSubmitted(true);
        if (oldPassword && newPassword && repeatedNewPassword) {
            dispatch(
				changePassword(oldPassword, newPassword, repeatedNewPassword)
			).then(
                (isPasswordChanged) => {
				    isPasswordChanged && handleClose()
            }).catch(
                (shouldRedirect) => {
                    shouldRedirect && history.push("/login")
            });
        }
      };

    return (<Modal show={isModalChangePasswordOpen} onHide={handleClose}>
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
                    onChange={(e) => setOldPassword(e.target.value)}
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
                    onChange={(e) => setNewPassword(e.target.value)}
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
                        onChange={(e) => setRepeatedNewPassword(e.target.value)}
                        placeholder="Repeat new password"
                    />
                <Form.Control.Feedback type="invalid">
                    Repeat new password is required
                </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            { updatingPasswordInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleChangePassword}>
                    Change password
            </Button>
        </Modal.Footer>
      </Modal>)
}

export default ChangePasswordModal;