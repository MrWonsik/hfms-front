import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { closeConfirmationModal } from '../../modal/modal.actions'

export const ConfirmationModal = ({ id, confirmationFunction, confirmationMessage}) => {

    const dispatch = useDispatch();

    const { confirmationModal } = useSelector(state => ({
        confirmationModal: state.modals.confirmationModal
    }));

    const handleClose = () => {
        dispatch(closeConfirmationModal())
      }

    const handleConfirm = (e) => {
        e.preventDefault();
    
        confirmationFunction();
        handleClose();
    };

    return (<Modal show={confirmationModal && id === confirmationModal.contextId && confirmationModal.isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{confirmationMessage}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>No</Button>
            <Button type="submit" variant="primary" onClick={handleConfirm}>Yes</Button>
        </Modal.Footer>
      </Modal>)
}

export default ConfirmationModal;