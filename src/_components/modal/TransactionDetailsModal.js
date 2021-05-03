import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { closeTransactionDetailsModal } from '../../modal/modal.actions'
import { Col, Row } from "react-bootstrap";

export const TransactionDetailsModal = ({ id, transaction }) => {
    const dispatch = useDispatch();

    const { transactionDetailsModal } = useSelector(state => ({
        transactionDetailsModal: state.modals.transactionDetailsModal
    }));

    const handleClose = () => {
        dispatch(closeTransactionDetailsModal())
    }

    const getFormattedDate = () => {
        let date = new Date(transaction.createdDate);
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${day} ${month} ${year}`;
    }

    return (<Modal show={transactionDetailsModal && id === transactionDetailsModal.contextId && transactionDetailsModal.isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{transaction.name} - {getFormattedDate()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                Shop name: {transaction.shopName}<br/>
                Category: {transaction.category}<br/>
                Cost: {transaction.cost}<br/>
            </Row>
            <Row>
                <Col>
                    Positions list:
                    {transaction.expensePositionList?.map(expensePosition => { 
                        return <li key={expensePosition.id}>
                                {expensePosition.expensePositionName} - {expensePosition.size} x {expensePosition.cost} zł
                            </li>
                    })}
                </Col>
                <Col>
                    call for receipt or display area where you can put receipt...
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" variant="secondary" onClick={() => handleClose()}>Close</Button>
        </Modal.Footer>
      </Modal>)
}


TransactionDetailsModal.propTypes = {
    id: PropTypes.string.isRequired,
    transaction: PropTypes.object.isRequired
}

export default TransactionDetailsModal;