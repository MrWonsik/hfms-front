import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { closeModalAddNewShop } from '../../modal/modal.actions'
import { createShop } from "../../finance/finance.actions";


export const AddNewShopModal = () => {

    const dispatch = useDispatch();

    const { addNewShopModalIsOpen, creatingShopInProgress } = useSelector(state => ({
        addNewShopModalIsOpen: state.modals.addNewShopModalIsOpen,
        creatingShopInProgress: state.finance.creatingShopInProgress
    }));

    const [submitted, setSubmitted] = useState(false);
    const [shopName, setShopName] = useState("");

    const handleClose = () => {
        dispatch(closeModalAddNewShop())
        setShopName("");
        setSubmitted(false);
      }

    const handleAddNewShop = (e) => {
        e.preventDefault();
    
        setSubmitted(true);
        if (shopName) {
            dispatch(createShop(shopName)).then((isShopCreated) => {
                if(isShopCreated) {
                    handleClose();
                }
            });
        }
      };

    return (<Modal show={addNewShopModalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Shop creator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="shopName">
                <Form.Label>Shop name:</Form.Label>
                <Form.Control
                    type="text"
                    className={ "form-control" + (submitted && !shopName ? " is-invalid" : "") }
                    name="shopName"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Enter shop name"
                />
            <Form.Control.Feedback type="invalid">
                Shop name is required
            </Form.Control.Feedback>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            { creatingShopInProgress && <Spinner animation="border" size="sm" />}
            <Button type="submit" variant="primary" onClick={handleAddNewShop}>
                    Create shop
            </Button>
        </Modal.Footer>
      </Modal>)
}

export default AddNewShopModal;