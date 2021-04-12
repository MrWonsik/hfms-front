import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { closeModalChangePasswordUsers } from "../../modal/modal.actions";
import { editUserPassword } from "../../user/users/users.actions";


export const ChangeUserPasswordModal = () => {
    const dispatch = useDispatch();

    const { changePasswordModalUsers, updatingPasswordInProgress } = useSelector(state => ({
        changePasswordModalUsers: state.modals.changePasswordModalUsers,
        updatingPasswordInProgress: state.users.updatingPasswordInProgress
    }));

    const [newPassword, setNewPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);  

    const handleClose = () => {
        dispatch(closeModalChangePasswordUsers())
        setNewPassword("");
        setSubmitted(false);
      }

    const handleChangePasswordUsers = (e) => {
        e.preventDefault();
    
        setSubmitted(true);
        if (newPassword) {
            dispatch(editUserPassword(newPassword, changePasswordModalUsers.id)).then((isPasswordChanged) => {
				if (isPasswordChanged) {
					handleClose();
				}
			});
        }
      };

    return (<Modal show={changePasswordModalUsers?.isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
            { updatingPasswordInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleChangePasswordUsers}>
                    Change password
            </Button>
        </Modal.Footer>
      </Modal>)
}

export default ChangeUserPasswordModal;