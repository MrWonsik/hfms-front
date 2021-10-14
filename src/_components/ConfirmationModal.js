import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { closeConfirmationModal } from './modal/modal.actions'
import { TS_TURN_ON } from '..'
import { closeModal } from './modal/modal'

export const ConfirmationModal = ({ id, confirmationFunction, confirmationMessage }) => {
  const dispatch = useDispatch()

  const { confirmationModal } = useSelector(state => ({
    confirmationModal: TS_TURN_ON ? state.modal : state.modals.confirmationModal
  }))

  const handleClose = () => {
    dispatch(TS_TURN_ON ? closeModal() : closeConfirmationModal())
  }

  const handleConfirm = (e) => {
    e.preventDefault()

    confirmationFunction()
    handleClose()
  }

  const shouldDisplay = () => {
    if(!TS_TURN_ON) {
      return confirmationModal && id === confirmationModal.contextId && confirmationModal.isOpen
    } else {
      return confirmationModal.isOpen && id === confirmationModal.context
    }
  }

  return (<Modal show={shouldDisplay()} onHide={handleClose}>
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

ConfirmationModal.propTypes = {
  id: PropTypes.string.isRequired,
  confirmationFunction: PropTypes.func.isRequired,
  confirmationMessage: PropTypes.string.isRequired
}

export default ConfirmationModal
