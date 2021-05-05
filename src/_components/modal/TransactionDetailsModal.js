import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { closeTransactionDetailsModal } from '../../modal/modal.actions'
import { Col, Form, Image, Spinner } from "react-bootstrap";
import Lightbox from 'react-image-lightbox';
import { BsTrash, BsUpload } from "react-icons/bs";
import { getIconWithActionAndTooltip } from "../../_helpers/wrapWithTooltip";

export const TransactionDetailsModal = ({ id, transaction }) => {
    const dispatch = useDispatch();

    const { transactionDetailsModal, expenseFileRequestLoading, expenseDetailsBytes } = useSelector(state => ({
        transactionDetailsModal: state.modals.transactionDetailsModal,
        expenseFileRequestLoading: state.finance.expenseFileRequestLoading,
        expenseDetailsBytes: state.finance.expenseDetailsBytes
    }));

    let [openImage, setOpenImage] = useState(false);

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

    const uploadFile = () => {
        console.log("uploadFile");
    }

    const deleteFile = () => {
        console.log("deleteFile");
    }

    const formRow = (label, value) => {
     return <Form.Row>
                <Form.Label className="transaction-details-label">{label}</Form.Label>
                <Col>
                    <Form.Control className="transaction-details-form-control" plaintext readOnly defaultValue={value}/>
                </Col>
            </Form.Row>
    }

    return (
            <>
            {openImage && <Lightbox mainSrc={expenseDetailsBytes} onCloseRequest={() => setOpenImage(false)}/> }
            <Modal show={transactionDetailsModal && id === transactionDetailsModal.contextId && transactionDetailsModal.isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{transaction.name} - {getFormattedDate()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="transaction-details-container">
                    <Form.Row>
                        <Col sm={6}>
                            {formRow("Shop name:", transaction.shopName ? transaction.shopName : "-")}
                            {formRow("Transaction type:", transaction.type)}
                            {formRow("Category:", transaction.categoryName)}
                            {formRow("Cost:", transaction.cost + " zł")}
                        </Col>
                        <Col sm={6}>
                            <div className="transaction-image-container">
                                {transaction.receiptId ?
                                    expenseFileRequestLoading 
                                    ? <div className="text-center"><Spinner animation="border" size="sm" /></div>
                                    : <Image src={expenseDetailsBytes} alt="recipt" className="transaction-image" onClick={() => setOpenImage(true)} fluid />
                                :
                                    <div className="text-center">No image</div>
                                }
                            </div>
                            <div className="text-center">
                                {getIconWithActionAndTooltip(BsUpload, "transaction-image-icon" + (transaction.receiptId ? " disabled" : ""), () => uploadFile(), "top", "Upload file")} 
                                {getIconWithActionAndTooltip(BsTrash, "transaction-image-icon" + (!transaction.receiptId ? " disabled" : ""), () => deleteFile(), "top", "Delete file")} 
                            </div>
                        </Col>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="secondary" onClick={() => handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
            </>)
}


TransactionDetailsModal.propTypes = {
    id: PropTypes.string.isRequired,
    transaction: PropTypes.object.isRequired
}

export default TransactionDetailsModal;